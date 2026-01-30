from django.db import models
from django.conf import settings
from apps.clinics.models import Clinic


class Specialization(models.Model):
    """
    Model representing medical specializations.
    """
    name = models.CharField(
        max_length=100,
        unique=True,
        help_text="Specialization name (e.g., Cardiology, Dermatology)"
    )
    description = models.TextField(
        blank=True,
        null=True,
        help_text="Description of the specialization"
    )
    
    class Meta:
        db_table = 'specializations'
        ordering = ['name']
    
    def __str__(self):
        return self.name


class DoctorProfile(models.Model):
    """
    Model representing a doctor's profile.
    One-to-one relationship with User model.
    """
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='doctor_profile',
        help_text="Associated user account"
    )
    specialization = models.ForeignKey(
        Specialization,
        on_delete=models.SET_NULL,
        null=True,
        related_name='doctors',
        help_text="Medical specialization"
    )
    clinic = models.ForeignKey(
        Clinic,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        help_text="Primary clinic"
    )
    license_number = models.CharField(
        max_length=50,
        unique=True,
        help_text="Medical license number"
    )
    consultation_fees = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        help_text="Consultation fees"
    )
    biography = models.TextField(
        blank=True,
        null=True,
        help_text="Doctor's biography"
    )
    years_of_experience = models.PositiveIntegerField(
        default=0,
        help_text="Years of medical experience"
    )
    availability_schedule = models.JSONField(
        default=dict,
        blank=True,
        help_text="Weekly availability schedule (JSON format)"
    )
    is_accepting_patients = models.BooleanField(
        default=True,
        help_text="Currently accepting new patients"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'doctor_profiles'
        ordering = ['user__last_name', 'user__first_name']
        indexes = [
            models.Index(fields=['specialization']),
            models.Index(fields=['clinic']),
            models.Index(fields=['is_accepting_patients']),
        ]
    
    def __str__(self):
        return f"Dr. {self.user.get_full_name()} - {self.specialization}"
    
    @property
    def full_name(self):
        return f"Dr. {self.user.get_full_name()}"
