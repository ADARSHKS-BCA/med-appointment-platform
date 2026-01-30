from rest_framework import viewsets, permissions, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Clinic
from .serializers import ClinicSerializer, ClinicListSerializer


class ClinicViewSet(viewsets.ModelViewSet):
    """
    ViewSet for Clinic CRUD operations.
    
    list: GET /api/clinics/
    retrieve: GET /api/clinics/{id}/
    create: POST /api/clinics/ (Admin only)
    update: PUT/PATCH /api/clinics/{id}/ (Admin only)
    destroy: DELETE /api/clinics/{id}/ (Admin only)
    """
    queryset = Clinic.objects.filter(is_active=True)
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['city', 'state', 'is_active']
    search_fields = ['name', 'city', 'state', 'address']
    ordering_fields = ['name', 'city', 'created_at']
    ordering = ['name']
    
    def get_serializer_class(self):
        if self.action == 'list':
            return ClinicListSerializer
        return ClinicSerializer
    
    def get_permissions(self):
        """
        Only admin users can create, update, or delete clinics.
        """
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [permissions.IsAdminUser()]
        return [permissions.IsAuthenticatedOrReadOnly()]
