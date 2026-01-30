from django.core.exceptions import ValidationError
from django.utils import timezone
from django.db.models import Q
from .models import Appointment


def validate_appointment_time(doctor, appointment_datetime, exclude_id=None):
    """
    Validate that the appointment time is available for the doctor.
    Prevents double booking.
    
    Args:
        doctor: DoctorProfile instance
        appointment_datetime: datetime object
        exclude_id: Appointment ID to exclude (for updates)
    
    Raises:
        ValidationError if time slot is not available
    """
    # Check if appointment is in the future
    if appointment_datetime <= timezone.now():
        raise ValidationError("Appointment must be scheduled for a future date and time")
    
    # Check for existing appointments at the same time
    existing_query = Appointment.objects.filter(
        doctor=doctor,
        appointment_datetime=appointment_datetime,
        status__in=['PENDING', 'CONFIRMED']
    )
    
    if exclude_id:
        existing_query = existing_query.exclude(id=exclude_id)
    
    if existing_query.exists():
        raise ValidationError(
            f"Doctor already has an appointment at {appointment_datetime.strftime('%Y-%m-%d %H:%M')}. "
            "Please choose a different time slot."
        )
    
    return True


def validate_doctor_availability(doctor, appointment_datetime):
    """
    Validate that the appointment time falls within doctor's availability schedule.
    
    Args:
        doctor: DoctorProfile instance
        appointment_datetime: datetime object
    
    Raises:
        ValidationError if time is outside doctor's availability
    """
    if not doctor.availability_schedule:
        # If no schedule is set, allow all times
        return True
    
    day_name = appointment_datetime.strftime('%A').lower()
    appointment_time = appointment_datetime.time()
    
    day_schedule = doctor.availability_schedule.get(day_name, [])
    
    if not day_schedule:
        raise ValidationError(
            f"Doctor is not available on {day_name.capitalize()}s"
        )
    
    # Check if appointment time falls within any available slot
    time_str = appointment_time.strftime('%H:%M')
    
    for slot in day_schedule:
        start_time = slot.get('start')
        end_time = slot.get('end')
        
        if start_time and end_time:
            if start_time <= time_str <= end_time:
                return True
    
    raise ValidationError(
        f"Appointment time is outside doctor's available hours on {day_name.capitalize()}"
    )


def validate_clinic_hours(clinic, appointment_datetime):
    """
    Validate that the appointment time falls within clinic's operating hours.
    
    Args:
        clinic: Clinic instance
        appointment_datetime: datetime object
    
    Raises:
        ValidationError if time is outside clinic hours
    """
    if not clinic.operating_hours:
        # If no hours are set, allow all times
        return True
    
    day_name = appointment_datetime.strftime('%A').lower()
    
    day_hours = clinic.operating_hours.get(day_name)
    
    if not day_hours:
        raise ValidationError(
            f"Clinic is closed on {day_name.capitalize()}s"
        )
    
    return True
