from rest_framework import permissions, status





class AllowReadUsersAuthenticatedUser(permissions.BasePermission):

    def has_permission(self, request, view):
        # Allow anyone to register
        if request.method == "GET":
            return True
        # Must be authenticated to view
        else:
            return request.user 

    def has_object_permission(self, request, view, obj):
        # Any view method requires you to be the user
        return obj.id == request.user.id or request.user.is_superuser