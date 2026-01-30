"""
Notification utility functions.
These are placeholder functions ready for SMS/Email integration.
"""
import logging

logger = logging.getLogger(__name__)


def send_sms(phone_number, message):
    """
    Send SMS notification.
    
    TODO: Integrate with SMS service (e.g., Twilio, AWS SNS)
    
    Args:
        phone_number: Recipient phone number
        message: SMS message content
    """
    logger.info(f"[SMS] To: {phone_number}, Message: {message}")
    # TODO: Implement actual SMS sending
    # Example with Twilio:
    # from twilio.rest import Client
    # client = Client(settings.TWILIO_ACCOUNT_SID, settings.TWILIO_AUTH_TOKEN)
    # client.messages.create(
    #     body=message,
    #     from_=settings.TWILIO_PHONE_NUMBER,
    #     to=phone_number
    # )
    pass


def send_email(email, subject, message):
    """
    Send email notification.
    
    TODO: Integrate with email service
    
    Args:
        email: Recipient email address
        subject: Email subject
        message: Email message content
    """
    logger.info(f"[EMAIL] To: {email}, Subject: {subject}, Message: {message}")
    # TODO: Implement actual email sending
    # Django's send_mail can be used:
    # from django.core.mail import send_mail
    # send_mail(
    #     subject,
    #     message,
    #     settings.DEFAULT_FROM_EMAIL,
    #     [email],
    #     fail_silently=False,
    # )
    pass


def notify_appointment_booked(appointment):
    """
    Send notifications when appointment is booked.
    
    Args:
        appointment: Appointment instance
    """
    patient = appointment.patient
    doctor = appointment.doctor.user
    
    # Notify patient
    patient_message = (
        f"Your appointment with Dr. {doctor.get_full_name()} "
        f"has been booked for {appointment.appointment_datetime.strftime('%B %d, %Y at %I:%M %p')}."
    )
    
    if patient.phone:
        send_sms(patient.phone, patient_message)
    
    if patient.email:
        send_email(
            patient.email,
            "Appointment Confirmation",
            patient_message
        )
    
    # Notify doctor
    doctor_message = (
        f"New appointment booked with {patient.get_full_name()} "
        f"on {appointment.appointment_datetime.strftime('%B %d, %Y at %I:%M %p')}."
    )
    
    if doctor.phone:
        send_sms(doctor.phone, doctor_message)
    
    if doctor.email:
        send_email(
            doctor.email,
            "New Appointment Booked",
            doctor_message
        )
    
    logger.info(f"Appointment booked notification sent for appointment #{appointment.id}")


def notify_appointment_cancelled(appointment):
    """
    Send notifications when appointment is cancelled.
    
    Args:
        appointment: Appointment instance
    """
    patient = appointment.patient
    doctor = appointment.doctor.user
    
    # Notify patient
    patient_message = (
        f"Your appointment with Dr. {doctor.get_full_name()} "
        f"scheduled for {appointment.appointment_datetime.strftime('%B %d, %Y at %I:%M %p')} "
        f"has been cancelled."
    )
    
    if patient.phone:
        send_sms(patient.phone, patient_message)
    
    if patient.email:
        send_email(
            patient.email,
            "Appointment Cancelled",
            patient_message
        )
    
    # Notify doctor
    doctor_message = (
        f"Appointment with {patient.get_full_name()} "
        f"on {appointment.appointment_datetime.strftime('%B %d, %Y at %I:%M %p')} "
        f"has been cancelled."
    )
    
    if doctor.phone:
        send_sms(doctor.phone, doctor_message)
    
    if doctor.email:
        send_email(
            doctor.email,
            "Appointment Cancelled",
            doctor_message
        )
    
    logger.info(f"Appointment cancellation notification sent for appointment #{appointment.id}")


def notify_status_changed(appointment, new_status):
    """
    Send notifications when appointment status changes.
    
    Args:
        appointment: Appointment instance
        new_status: New status value
    """
    patient = appointment.patient
    doctor = appointment.doctor.user
    
    status_messages = {
        'confirmed': 'confirmed',
        'completed': 'marked as completed',
        'cancelled': 'cancelled'
    }
    
    status_text = status_messages.get(new_status, new_status)
    
    # Notify patient
    patient_message = (
        f"Your appointment with Dr. {doctor.get_full_name()} "
        f"on {appointment.appointment_datetime.strftime('%B %d, %Y at %I:%M %p')} "
        f"has been {status_text}."
    )
    
    if patient.phone:
        send_sms(patient.phone, patient_message)
    
    if patient.email:
        send_email(
            patient.email,
            f"Appointment {status_text.title()}",
            patient_message
        )
    
    logger.info(f"Status change notification sent for appointment #{appointment.id} - {new_status}")
