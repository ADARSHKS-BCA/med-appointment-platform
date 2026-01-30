from rest_framework import viewsets, permissions, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from apps.users.permissions import IsDoctor
from .models import Specialization, DoctorProfile
from .serializers import (
    SpecializationSerializer,
    DoctorProfileSerializer,
    DoctorListSerializer,
    AvailabilitySerializer
)


class SpecializationViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for viewing specializations.
    
    list: GET /api/doctors/specializations/
    retrieve: GET /api/doctors/specializations/{id}/
    """
    queryset = Specialization.objects.all()
    serializer_class = SpecializationSerializer
    permission_classes = [permissions.AllowAny]


class DoctorProfileViewSet(viewsets.ModelViewSet):
    """
    ViewSet for Doctor Profile CRUD operations.
    
    list: GET /api/doctors/
    retrieve: GET /api/doctors/{id}/
    update: PUT/PATCH /api/doctors/{id}/ (Doctor only - own profile)
    """
    queryset = DoctorProfile.objects.select_related(
        'user', 'specialization', 'clinic'
    ).filter(user__is_active=True)
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['specialization', 'clinic', 'is_accepting_patients']
    search_fields = ['user__first_name', 'user__last_name', 'specialization__name']
    ordering_fields = ['consultation_fees', 'years_of_experience', 'created_at']
    ordering = ['user__last_name']
    
    def get_serializer_class(self):
        if self.action == 'list':
            return DoctorListSerializer
        elif self.action in ['availability', 'update_availability']:
            return AvailabilitySerializer
        return DoctorProfileSerializer
    
    def get_permissions(self):
        """
        Only doctors can update their own profiles.
        """
        if self.action in ['update', 'partial_update']:
            return [IsDoctor()]
        return [permissions.IsAuthenticatedOrReadOnly()]
    
    def update(self, request, *args, **kwargs):
        """
        Only allow doctors to update their own profile.
        """
        instance = self.get_object()
        if instance.user != request.user:
            return Response({
                'error': 'You can only update your own profile'
            }, status=status.HTTP_403_FORBIDDEN)
        
        return super().update(request, *args, **kwargs)
    
    @action(detail=True, methods=['get'])
    def availability(self, request, pk=None):
        """
        Get doctor's availability schedule.
        GET /api/doctors/{id}/availability/
        """
        doctor = self.get_object()
        serializer = AvailabilitySerializer({
            'availability_schedule': doctor.availability_schedule
        })
        return Response(serializer.data)
    
    @action(detail=True, methods=['put', 'patch'], permission_classes=[IsDoctor])
    def update_availability(self, request, pk=None):
        """
        Update doctor's availability schedule.
        PUT/PATCH /api/doctors/{id}/update_availability/
        """
        doctor = self.get_object()
        
        if doctor.user != request.user:
            return Response({
                'error': 'You can only update your own availability'
            }, status=status.HTTP_403_FORBIDDEN)
        
        serializer = AvailabilitySerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        doctor.availability_schedule = serializer.validated_data['availability_schedule']
        doctor.save()
        
        return Response({
            'message': 'Availability updated successfully',
            'availability_schedule': doctor.availability_schedule
        })
