from django.db.models.signals import post_save, pre_delete
from django.dispatch import receiver
from .models import Appointment
from utils.notifications import (
    notify_appointment_booked,
    notify_appointment_cancelled,
    notify_status_changed
)


@receiver(post_save, sender=Appointment)
def appointment_post_save(sender, instance, created, **kwargs):
    """
    Signal handler for appointment creation and updates.
    Triggers notifications for booking and status changes.
    """
    if created:
        # New appointment created
        notify_appointment_booked(instance)
    else:
        # Appointment updated - check if status changed
        if instance.status == 'CONFIRMED':
            notify_status_changed(instance, 'confirmed')
        elif instance.status == 'COMPLETED':
            notify_status_changed(instance, 'completed')
        elif instance.status == 'CANCELLED':
            notify_status_changed(instance, 'cancelled')


@receiver(pre_delete, sender=Appointment)
def appointment_pre_delete(sender, instance, **kwargs):
    """
    Signal handler for appointment deletion.
    Triggers cancellation notification.
    """
    if instance.status not in ['CANCELLED', 'COMPLETED']:
        notify_appointment_cancelled(instance)
