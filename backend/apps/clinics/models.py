from django.db import models


class Clinic(models.Model):
    """
    Model representing a medical clinic.
    """
    name = models.CharField(
        max_length=200,
        help_text="Clinic name"
    )
    address = models.TextField(
        help_text="Street address"
    )
    city = models.CharField(
        max_length=100,
        help_text="City"
    )
    state = models.CharField(
        max_length=100,
        help_text="State/Province"
    )
    zip_code = models.CharField(
        max_length=20,
        help_text="Postal/ZIP code"
    )
    phone = models.CharField(
        max_length=15,
        help_text="Contact phone number"
    )
    email = models.EmailField(
        help_text="Contact email"
    )
    operating_hours = models.JSONField(
        default=dict,
        blank=True,
        help_text="Operating hours by day (JSON format)"
    )
    facilities = models.JSONField(
        default=list,
        blank=True,
        help_text="Available facilities (JSON array)"
    )
    description = models.TextField(
        blank=True,
        null=True,
        help_text="Clinic description"
    )
    is_active = models.BooleanField(
        default=True,
        help_text="Is clinic currently active"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'clinics'
        ordering = ['name']
        indexes = [
            models.Index(fields=['city', 'state']),
            models.Index(fields=['is_active']),
        ]
    
    def __str__(self):
        return f"{self.name} - {self.city}"
    
    @property
    def full_address(self):
        return f"{self.address}, {self.city}, {self.state} {self.zip_code}"
