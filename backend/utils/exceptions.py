"""
Custom exception classes for the application.
"""
from rest_framework.exceptions import APIException
from rest_framework import status


class DoubleBookingError(APIException):
    """Exception raised when attempting to book an already occupied time slot."""
    status_code = status.HTTP_409_CONFLICT
    default_detail = 'This time slot is already booked.'
    default_code = 'double_booking'


class InvalidAppointmentTimeError(APIException):
    """Exception raised when appointment time is invalid."""
    status_code = status.HTTP_400_BAD_REQUEST
    default_detail = 'Invalid appointment time.'
    default_code = 'invalid_appointment_time'


class UnauthorizedActionError(APIException):
    """Exception raised when user attempts unauthorized action."""
    status_code = status.HTTP_403_FORBIDDEN
    default_detail = 'You are not authorized to perform this action.'
    default_code = 'unauthorized_action'


class DoctorNotAvailableError(APIException):
    """Exception raised when doctor is not available at requested time."""
    status_code = status.HTTP_400_BAD_REQUEST
    default_detail = 'Doctor is not available at the requested time.'
    default_code = 'doctor_not_available'
