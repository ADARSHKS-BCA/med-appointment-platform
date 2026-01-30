from rest_framework import permissions


class IsPatient(permissions.BasePermission):
    """
    Custom permission to only allow patients to access certain views.
    """
    def has_permission(self, request, view):
        return (
            request.user and
            request.user.is_authenticated and
            request.user.role == 'PATIENT'
        )


class IsDoctor(permissions.BasePermission):
    """
    Custom permission to only allow doctors to access certain views.
    """
    def has_permission(self, request, view):
        return (
            request.user and
            request.user.is_authenticated and
            request.user.role == 'DOCTOR'
        )


class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to edit it.
    """
    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request
        if request.method in permissions.SAFE_METHODS:
            return True
        
        # Write permissions are only allowed to the owner
        return obj == request.user or obj.user == request.user
