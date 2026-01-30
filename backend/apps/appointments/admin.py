from django.contrib import admin
from .models import Appointment


@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    """Admin interface for Appointment model"""
    list_display = [
        'id', 'get_patient_name', 'get_doctor_name',
        'appointment_datetime', 'status', 'created_at'
    ]
    list_filter = ['status', 'appointment_datetime', 'created_at']
    search_fields = [
        'patient__first_name', 'patient__last_name',
        'doctor__user__first_name', 'doctor__user__last_name',
        'reason'
    ]
    ordering = ['-appointment_datetime']
    readonly_fields = ['created_at', 'updated_at']
    
    fieldsets = (
        ('Appointment Details', {
            'fields': ('patient', 'doctor', 'clinic', 'appointment_datetime', 'status')
        }),
        ('Medical Information', {
            'fields': ('reason', 'notes')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at')
        }),
    )
    
    def get_patient_name(self, obj):
        return obj.patient.get_full_name()
    get_patient_name.short_description = 'Patient'
    
    def get_doctor_name(self, obj):
        return obj.doctor.full_name
    get_doctor_name.short_description = 'Doctor'
