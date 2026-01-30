from rest_framework import serializers
from apps.users.serializers import UserProfileSerializer
from apps.clinics.serializers import ClinicListSerializer
from .models import Specialization, DoctorProfile


class SpecializationSerializer(serializers.ModelSerializer):
    """Serializer for Specialization model"""
    
    class Meta:
        model = Specialization
        fields = ['id', 'name', 'description']


class DoctorProfileSerializer(serializers.ModelSerializer):
    """Detailed serializer for Doctor Profile"""
    user = UserProfileSerializer(read_only=True)
    specialization = SpecializationSerializer(read_only=True)
    clinic = ClinicListSerializer(read_only=True)
    full_name = serializers.ReadOnlyField()
    
    # Write-only fields for updates
    specialization_id = serializers.IntegerField(write_only=True, required=False)
    clinic_id = serializers.IntegerField(write_only=True, required=False)
    
    class Meta:
        model = DoctorProfile
        fields = [
            'id', 'user', 'full_name', 'specialization', 'specialization_id',
            'clinic', 'clinic_id', 'license_number', 'consultation_fees',
            'biography', 'years_of_experience', 'availability_schedule',
            'is_accepting_patients', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'user', 'created_at', 'updated_at']


class DoctorListSerializer(serializers.ModelSerializer):
    """Lightweight serializer for doctor listings"""
    full_name = serializers.ReadOnlyField()
    specialization_name = serializers.CharField(source='specialization.name', read_only=True)
    clinic_name = serializers.CharField(source='clinic.name', read_only=True)
    
    class Meta:
        model = DoctorProfile
        fields = [
            'id', 'full_name', 'specialization_name', 'clinic_name',
            'consultation_fees', 'years_of_experience', 'is_accepting_patients'
        ]


class AvailabilitySerializer(serializers.Serializer):
    """Serializer for doctor availability schedule"""
    availability_schedule = serializers.JSONField()
    
    def validate_availability_schedule(self, value):
        """
        Validate availability schedule format.
        Expected format:
        {
            "monday": [{"start": "09:00", "end": "17:00"}],
            "tuesday": [{"start": "09:00", "end": "17:00"}],
            ...
        }
        """
        valid_days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
        
        if not isinstance(value, dict):
            raise serializers.ValidationError("Availability schedule must be a dictionary")
        
        for day, slots in value.items():
            if day.lower() not in valid_days:
                raise serializers.ValidationError(f"Invalid day: {day}")
            
            if not isinstance(slots, list):
                raise serializers.ValidationError(f"Slots for {day} must be a list")
            
            for slot in slots:
                if not isinstance(slot, dict) or 'start' not in slot or 'end' not in slot:
                    raise serializers.ValidationError(
                        f"Each slot must have 'start' and 'end' times"
                    )
        
        return value
