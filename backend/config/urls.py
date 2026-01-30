"""
URL configuration for Medical Appointment Management System.
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

# API Documentation
schema_view = get_schema_view(
    openapi.Info(
        title="Medical Appointment Management API",
        default_version='v1',
        description="REST API for managing medical appointments, doctors, clinics, and patients",
        terms_of_service="https://www.example.com/terms/",
        contact=openapi.Contact(email="contact@medappointment.com"),
        license=openapi.License(name="MIT License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    # Admin
    path('admin/', admin.site.urls),
    
    # API Documentation
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    path('swagger.json', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    
    # API Endpoints
    path('api/auth/', include('apps.users.urls')),
    path('api/doctors/', include('apps.doctors.urls')),
    path('api/clinics/', include('apps.clinics.urls')),
    path('api/appointments/', include('apps.appointments.urls')),
]

# Serve media files in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

# Customize admin site
admin.site.site_header = "Medical Appointment Management"
admin.site.site_title = "Med Appointment Admin"
admin.site.index_title = "Welcome to Medical Appointment Management System"
