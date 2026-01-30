from rest_framework import serializers
from django.utils import timezone
from apps.users.serializers import UserProfileSerializer
from apps.doctors.serializers import DoctorListSerializer
from apps.clinics.serializers import ClinicListSerializer
from .models import Appointment
from .validators import (
    validate_appointment_time,
    validate_doctor_availability,
    validate_clinic_hours
)


class AppointmentSerializer(serializers.ModelSerializer):
    """Detailed serializer for Appointment"""
    patient = UserProfileSerializer(read_only=True)
    doctor = DoctorListSerializer(read_only=True)
    clinic = ClinicListSerializer(read_only=True)
    is_upcoming = serializers.ReadOnlyField()
    is_past = serializers.ReadOnlyField()
    
    # Write-only fields for creation
    doctor_id = serializers.IntegerField(write_only=True)
    clinic_id = serializers.IntegerField(write_only=True)
    
    class Meta:
        model = Appointment
        fields = [
            'id', 'patient', 'doctor', 'doctor_id', 'clinic', 'clinic_id',
            'appointment_datetime', 'status', 'reason', 'notes',
            'is_upcoming', 'is_past', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'patient', 'created_at', 'updated_at']
    
    def validate_appointment_datetime(self, value):
        """Validate appointment datetime is in the future"""
        if value <= timezone.now():
            raise serializers.ValidationError(
                "Appointment must be scheduled for a future date and time"
            )
        return value
    
    def validate(self, attrs):
        """Validate appointment data"""
        doctor_id = attrs.get('doctor_id')
        clinic_id = attrs.get('clinic_id')
        appointment_datetime = attrs.get('appointment_datetime')
        
        if not all([doctor_id, clinic_id, appointment_datetime]):
            return attrs
        
        # Import here to avoid circular imports
        from apps.doctors.models import DoctorProfile
        from apps.clinics.models import Clinic
        
        try:
            doctor = DoctorProfile.objects.get(id=doctor_id)
            clinic = Clinic.objects.get(id=clinic_id)
        except (DoctorProfile.DoesNotExist, Clinic.DoesNotExist):
            raise serializers.ValidationError("Invalid doctor or clinic")
        
        # Validate doctor is accepting patients
        if not doctor.is_accepting_patients:
            raise serializers.ValidationError({
                'doctor_id': 'This doctor is not currently accepting new patients'
            })
        
        # Validate appointment time availability (double booking prevention)
        exclude_id = self.instance.id if self.instance else None
        validate_appointment_time(doctor, appointment_datetime, exclude_id)
        
        # Validate doctor availability schedule
        validate_doctor_availability(doctor, appointment_datetime)
        
        # Validate clinic operating hours
        validate_clinic_hours(clinic, appointment_datetime)
        
        return attrs
    
    def create(self, validated_data):
        """Create appointment with patient from request context"""
        from apps.doctors.models import DoctorProfile
        from apps.clinics.models import Clinic
        
        doctor_id = validated_data.pop('doctor_id')
        clinic_id = validated_data.pop('clinic_id')
        
        validated_data['doctor'] = DoctorProfile.objects.get(id=doctor_id)
        validated_data['clinic'] = Clinic.objects.get(id=clinic_id)
        validated_data['patient'] = self.context['request'].user
        
        return super().create(validated_data)


class AppointmentListSerializer(serializers.ModelSerializer):
    """Lightweight serializer for appointment listings"""
    patient_name = serializers.CharField(source='patient.get_full_name', read_only=True)
    doctor_name = serializers.CharField(source='doctor.full_name', read_only=True)
    clinic_name = serializers.CharField(source='clinic.name', read_only=True)
    is_upcoming = serializers.ReadOnlyField()
    
    class Meta:
        model = Appointment
        fields = [
            'id', 'patient_name', 'doctor_name', 'clinic_name',
            'appointment_datetime', 'status', 'is_upcoming', 'created_at'
        ]


class AppointmentStatusSerializer(serializers.Serializer):
    """Serializer for updating appointment status"""
    status = serializers.ChoiceField(choices=Appointment.Status.choices)
    notes = serializers.CharField(required=False, allow_blank=True)
