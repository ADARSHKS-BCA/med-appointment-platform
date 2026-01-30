from rest_framework import viewsets, permissions, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from django.utils import timezone
from apps.users.permissions import IsPatient, IsDoctor
from .models import Appointment
from .serializers import (
    AppointmentSerializer,
    AppointmentListSerializer,
    AppointmentStatusSerializer
)


class AppointmentViewSet(viewsets.ModelViewSet):
    """
    ViewSet for Appointment CRUD operations.
    
    list: GET /api/appointments/
    retrieve: GET /api/appointments/{id}/
    create: POST /api/appointments/ (Patient only)
    update: PUT/PATCH /api/appointments/{id}/ (Limited)
    destroy: DELETE /api/appointments/{id}/ (Cancel appointment)
    """
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['status', 'doctor', 'clinic']
    ordering_fields = ['appointment_datetime', 'created_at']
    ordering = ['-appointment_datetime']
    
    def get_queryset(self):
        """
        Filter appointments based on user role.
        Patients see their own appointments.
        Doctors see appointments with them.
        """
        user = self.request.user
        
        if user.role == 'PATIENT':
            return Appointment.objects.filter(patient=user).select_related(
                'patient', 'doctor__user', 'clinic'
            )
        elif user.role == 'DOCTOR':
            try:
                return Appointment.objects.filter(
                    doctor=user.doctor_profile
                ).select_related('patient', 'doctor__user', 'clinic')
            except:
                return Appointment.objects.none()
        
        return Appointment.objects.none()
    
    def get_serializer_class(self):
        if self.action == 'list':
            return AppointmentListSerializer
        elif self.action == 'update_status':
            return AppointmentStatusSerializer
        return AppointmentSerializer
    
    def get_permissions(self):
        """
        Patients can create appointments.
        Doctors can update status.
        Both can view and cancel their own appointments.
        """
        if self.action == 'create':
            return [IsPatient()]
        elif self.action == 'update_status':
            return [IsDoctor()]
        return [permissions.IsAuthenticated()]
    
    def create(self, request, *args, **kwargs):
        """
        Create a new appointment (Patient only).
        """
        if request.user.role != 'PATIENT':
            return Response({
                'error': 'Only patients can book appointments'
            }, status=status.HTTP_403_FORBIDDEN)
        
        return super().create(request, *args, **kwargs)
    
    def destroy(self, request, *args, **kwargs):
        """
        Cancel an appointment (soft delete by changing status).
        """
        appointment = self.get_object()
        
        # Check if user has permission to cancel
        if request.user.role == 'PATIENT' and appointment.patient != request.user:
            return Response({
                'error': 'You can only cancel your own appointments'
            }, status=status.HTTP_403_FORBIDDEN)
        
        if request.user.role == 'DOCTOR':
            try:
                if appointment.doctor != request.user.doctor_profile:
                    return Response({
                        'error': 'You can only cancel appointments with you'
                    }, status=status.HTTP_403_FORBIDDEN)
            except:
                return Response({
                    'error': 'Invalid doctor profile'
                }, status=status.HTTP_403_FORBIDDEN)
        
        # Check if appointment can be cancelled
        if appointment.status == 'COMPLETED':
            return Response({
                'error': 'Cannot cancel completed appointments'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        if appointment.status == 'CANCELLED':
            return Response({
                'error': 'Appointment is already cancelled'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        # Cancel the appointment
        appointment.status = 'CANCELLED'
        appointment.save()
        
        return Response({
            'message': 'Appointment cancelled successfully'
        }, status=status.HTTP_200_OK)
    
    @action(detail=True, methods=['patch'], permission_classes=[IsDoctor])
    def update_status(self, request, pk=None):
        """
        Update appointment status (Doctor only).
        PATCH /api/appointments/{id}/update_status/
        """
        appointment = self.get_object()
        
        # Verify doctor owns this appointment
        try:
            if appointment.doctor != request.user.doctor_profile:
                return Response({
                    'error': 'You can only update status for your own appointments'
                }, status=status.HTTP_403_FORBIDDEN)
        except:
            return Response({
                'error': 'Invalid doctor profile'
            }, status=status.HTTP_403_FORBIDDEN)
        
        serializer = AppointmentStatusSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        appointment.status = serializer.validated_data['status']
        if 'notes' in serializer.validated_data:
            appointment.notes = serializer.validated_data['notes']
        appointment.save()
        
        return Response({
            'message': 'Appointment status updated successfully',
            'appointment': AppointmentSerializer(appointment).data
        })
    
    @action(detail=False, methods=['get'])
    def upcoming(self, request):
        """
        Get upcoming appointments.
        GET /api/appointments/upcoming/
        """
        queryset = self.get_queryset().filter(
            appointment_datetime__gt=timezone.now(),
            status__in=['PENDING', 'CONFIRMED']
        )
        
        serializer = AppointmentListSerializer(queryset, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def past(self, request):
        """
        Get past appointments.
        GET /api/appointments/past/
        """
        queryset = self.get_queryset().filter(
            appointment_datetime__lte=timezone.now()
        )
        
        serializer = AppointmentListSerializer(queryset, many=True)
        return Response(serializer.data)
