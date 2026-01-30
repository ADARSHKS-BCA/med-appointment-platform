from django.contrib import admin
from .models import Clinic


@admin.register(Clinic)
class ClinicAdmin(admin.ModelAdmin):
    """Admin interface for Clinic model"""
    list_display = ['name', 'city', 'state', 'phone', 'is_active', 'created_at']
    list_filter = ['is_active', 'city', 'state']
    search_fields = ['name', 'city', 'state', 'address']
    ordering = ['name']
    readonly_fields = ['created_at', 'updated_at']
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('name', 'description', 'is_active')
        }),
        ('Location', {
            'fields': ('address', 'city', 'state', 'zip_code')
        }),
        ('Contact', {
            'fields': ('phone', 'email')
        }),
        ('Additional Details', {
            'fields': ('operating_hours', 'facilities')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at')
        }),
    )
