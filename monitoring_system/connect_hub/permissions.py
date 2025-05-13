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
        return bool(request.method == 'PATCH' and user_info and user_info.type == 'электросетевая компания')


class IsProvider(BasePermission):
    def has_permission(self, request, view):
        user_info = getattr(request.user, 'user_info', None)
        return bool(request.method == 'POST' and user_info and user_info.type == 'магистральный провайдер')


class IsAuthenticatedAndAccepted(BasePermission):
    """
    Allows access only to authenticated users.
    """

    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.user_info.accept_status == 'Принято')
