from django.contrib import admin
from .models import Specialization, DoctorProfile


@admin.register(Specialization)
class SpecializationAdmin(admin.ModelAdmin):
    """Admin interface for Specialization model"""
    list_display = ['name', 'description']
    search_fields = ['name']
    ordering = ['name']


@admin.register(DoctorProfile)
class DoctorProfileAdmin(admin.ModelAdmin):
    """Admin interface for DoctorProfile model"""
    list_display = [
        'get_full_name', 'specialization', 'clinic',
        'consultation_fees', 'years_of_experience',
        'is_accepting_patients', 'created_at'
    ]
    list_filter = ['specialization', 'clinic', 'is_accepting_patients']
    search_fields = [
        'user__first_name', 'user__last_name',
        'user__email', 'license_number'
    ]
    ordering = ['user__last_name', 'user__first_name']
    readonly_fields = ['created_at', 'updated_at']
    
    fieldsets = (
        ('User Information', {
            'fields': ('user',)
        }),
        ('Professional Details', {
            'fields': (
                'specialization', 'clinic', 'license_number',
                'consultation_fees', 'years_of_experience'
            )
        }),
        ('About', {
            'fields': ('biography',)
        }),
        ('Availability', {
            'fields': ('availability_schedule', 'is_accepting_patients')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at')
        }),
    )
    
    def get_full_name(self, obj):
        return obj.full_name
    get_full_name.short_description = 'Doctor Name'
