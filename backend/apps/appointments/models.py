from django.db import models
from django.conf import settings
from django.core.exceptions import ValidationError
from django.utils import timezone
from apps.doctors.models import DoctorProfile
from apps.clinics.models import Clinic


class Appointment(models.Model):
    """
    Model representing a medical appointment.
    """
    
    class Status(models.TextChoices):
        PENDING = 'PENDING', 'Pending'
        CONFIRMED = 'CONFIRMED', 'Confirmed'
        CANCELLED = 'CANCELLED', 'Cancelled'
        COMPLETED = 'COMPLETED', 'Completed'
    
    patient = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='appointments',
        help_text="Patient who booked the appointment"
    )
    doctor = models.ForeignKey(
        DoctorProfile,
        on_delete=models.CASCADE,
        related_name='appointments',
        help_text="Doctor for the appointment"
    )
    clinic = models.ForeignKey(
        Clinic,
        on_delete=models.CASCADE,
        related_name='appointments',
        help_text="Clinic where appointment takes place"
    )
    appointment_datetime = models.DateTimeField(
        help_text="Date and time of appointment"
    )
    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.PENDING,
        help_text="Appointment status"
    )
    reason = models.TextField(
        help_text="Reason for visit"
    )
    notes = models.TextField(
        blank=True,
        null=True,
        help_text="Doctor's notes (visible only to doctor)"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'appointments'
        ordering = ['-appointment_datetime']
        indexes = [
            models.Index(fields=['patient', 'appointment_datetime']),
            models.Index(fields=['doctor', 'appointment_datetime']),
            models.Index(fields=['status']),
        ]
        # Prevent double booking - unique constraint on doctor and datetime
        constraints = [
            models.UniqueConstraint(
                fields=['doctor', 'appointment_datetime'],
                name='unique_doctor_appointment_time',
                condition=models.Q(status__in=['PENDING', 'CONFIRMED'])
            )
        ]
    
    def __str__(self):
        return f"{self.patient.get_full_name()} with {self.doctor.full_name} on {self.appointment_datetime}"
    
    def clean(self):
        """Validate appointment before saving"""
        super().clean()
        
        # Ensure appointment is in the future
        if self.appointment_datetime and self.appointment_datetime <= timezone.now():
            raise ValidationError({
                'appointment_datetime': 'Appointment must be scheduled for a future date and time'
            })
        
        # Ensure patient role is PATIENT
        if self.patient and self.patient.role != 'PATIENT':
            raise ValidationError({
                'patient': 'Only users with PATIENT role can book appointments'
            })
        
        # Check if doctor is accepting patients
        if self.doctor and not self.doctor.is_accepting_patients:
            raise ValidationError({
                'doctor': 'This doctor is not currently accepting new patients'
            })
    
    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)
    
    @property
    def is_upcoming(self):
        return self.appointment_datetime > timezone.now() and self.status in ['PENDING', 'CONFIRMED']
    
    @property
    def is_past(self):
        return self.appointment_datetime <= timezone.now()
