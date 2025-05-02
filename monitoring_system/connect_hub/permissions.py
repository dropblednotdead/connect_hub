from rest_framework.permissions import BasePermission, SAFE_METHODS


class IsOwnerOrReadOnly(BasePermission):
    def has_permission(self, request, view):
        return bool(
            request.method in SAFE_METHODS or
            request.user and
            request.user.user_info.type == 'электросетевая компания'
        )


class IsGridCompany(BasePermission):
    def has_permission(self, request, view):
        user_info = getattr(request.user, 'user_info', None)
        return request.method == 'PATCH' and user_info and user_info.type == 'электросетевая компания'