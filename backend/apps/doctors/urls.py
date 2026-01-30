from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SpecializationViewSet, DoctorProfileViewSet

router = DefaultRouter()
router.register(r'specializations', SpecializationViewSet, basename='specialization')
router.register(r'', DoctorProfileViewSet, basename='doctor')

urlpatterns = [
    path('', include(router.urls)),
]
