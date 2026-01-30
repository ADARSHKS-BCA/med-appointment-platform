from django.db.models.signals import post_save
from django.dispatch import receiver
from django.conf import settings
from apps.doctors.models import DoctorProfile

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_doctor_profile(sender, instance, created, **kwargs):
    """
    Automatically create a DoctorProfile when a new User with role='DOCTOR' is created.
    """
    if created and instance.role == 'DOCTOR':
        DoctorProfile.objects.create(
            user=instance,
            license_number=f"TEMP-{instance.id}",  # Temporary unique license number
            consultation_fees=50.00,  # Default fee
            years_of_experience=0
        )
