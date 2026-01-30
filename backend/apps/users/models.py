from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    """
    Custom User model extending Django's AbstractUser.
    Supports role-based access control for Patient and Doctor roles.
    """
    
    class Role(models.TextChoices):
        PATIENT = 'PATIENT', 'Patient'
        DOCTOR = 'DOCTOR', 'Doctor'
    
    # Additional fields
    role = models.CharField(
        max_length=10,
        choices=Role.choices,
        default=Role.PATIENT,
        help_text="User role for access control"
    )
    phone = models.CharField(
        max_length=15,
        blank=True,
        null=True,
        help_text="Contact phone number"
    )
    is_email_verified = models.BooleanField(
        default=False,
        help_text="Email verification status"
    )
    profile_picture = models.ImageField(
        upload_to='profile_pictures/',
        blank=True,
        null=True,
        help_text="User profile picture"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'users'
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['email']),
            models.Index(fields=['role']),
        ]
    
    def __str__(self):
        return f"{self.get_full_name()} ({self.role})"
    
    @property
    def is_patient(self):
        return self.role == self.Role.PATIENT
    
    @property
    def is_doctor(self):
        return self.role == self.Role.DOCTOR
