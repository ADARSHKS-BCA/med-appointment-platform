from rest_framework import serializers
from .models import Clinic


class ClinicSerializer(serializers.ModelSerializer):
    """Serializer for Clinic model"""
    full_address = serializers.ReadOnlyField()
    doctor_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Clinic
        fields = [
            'id', 'name', 'address', 'city', 'state', 'zip_code',
            'full_address', 'phone', 'email', 'operating_hours',
            'facilities', 'description', 'is_active', 'doctor_count',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']
    
    def get_doctor_count(self, obj):
        return obj.doctorprofile_set.filter(user__is_active=True).count()


class ClinicListSerializer(serializers.ModelSerializer):
    """Lightweight serializer for clinic listings"""
    full_address = serializers.ReadOnlyField()
    
    class Meta:
        model = Clinic
        fields = [
            'id', 'name', 'city', 'state', 'full_address',
            'phone', 'is_active'
        ]
