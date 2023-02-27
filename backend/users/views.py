from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status
from .permissions import AllowReadUsersAuthenticatedUser
from django.contrib.auth import get_user_model
from django.http import HttpResponse
from rest_framework import generics
from .serializers import (UserCreateSerializer,
                          UserSerializer,
                          ChangePasswordSerializer,
                          ChangeEmailSerializer,
                          ChangeFullNameSerializer)
from .models import UserAccount
User = get_user_model()


class RegisterView(APIView):
    def post(self, request):
        data = request.data

        serializer = UserCreateSerializer(data=data)

        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        user = serializer.create(serializer.validated_data)

        user = UserSerializer(user)

        return Response(user.data, status=status.HTTP_201_CREATED)


class RetrieveUserView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        print(user.id)
        user = UserSerializer(user)

        return Response(user.data, status=status.HTTP_200_OK)


class RetrieveListOfUserView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get(self, request):
        user = self.request.user
        if user.is_superuser:
            return User.objects.all()
        return HttpResponse(email=user.email)


class ChangePasswordView(generics.UpdateAPIView):
    """
    An endpoint for changing password inside of profile.
    """
    serializer_class = ChangePasswordSerializer
    model = User
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self, queryset=None):
        obj = self.request.user
        return obj

    def update(self, request, *args, **kwargs):
        if self.request.method == 'PUT':
            self.object = self.get_object()
            serializer = self.get_serializer(data=request.data)

            if serializer.is_valid():
                # Check old password
                if not self.object.check_password(serializer.data.get("old_password")):
                    return Response({"old_password": ["Wrong password."]}, status=status.HTTP_400_BAD_REQUEST)
                # set_password also hashes the password that the user will get
                self.object.set_password(serializer.data.get("new_password"))
                self.object.save()
                response = {
                    'status': 'success',
                    'code': status.HTTP_200_OK,
                    'message': 'Password updated successfully',
                    'data': []
                }

                return Response(response)

            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ChangeEmailView(generics.UpdateAPIView):
    """
    An endpoint for changing email inside of profile.
    """
    serializer_class = ChangeEmailSerializer
    model = User
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self, queryset=None):
        obj = self.request.user
        return obj

    def update(self, request, *args, **kwargs):
        if self.request.method == 'PUT':
            self.object = self.get_object()
            serializer = self.get_serializer(data=request.data)
            '''
           Cases:
           1. Then old email wich is setup buy user in front is not the same with old email wich are assign to user id; - done
           2. The old email is same us new email - done
           3. The fields are wrong (security level) - done
           '''
            if serializer.is_valid():
                if User.objects.filter(email=serializer.data.get("old_email")).exists():
                    if (self.object.email == serializer.data.get("new_email")):
                        self.object.save()
                        response = {
                            'status': 'Success',
                            'code': status.HTTP_200_OK,
                            'message': 'Email are same',
                            'email': [serializer.data.get("new_email")]
                        }
                        return Response(response)
                    self.object.email = serializer.data.get("new_email")
                    self.object.save()
                    response = {
                        'status': 'Success',
                        'code': status.HTTP_200_OK,
                        'message': 'Email updated successfully',
                        'email': [serializer.data.get("new_email")]
                    }
                    return Response(response)
                else:
                    response = {
                        'status': 'Fail',
                        'code': status.HTTP_409_CONFLICT,
                        'message': 'The old email you indicated is not the same as the actual email in our system.',
                        'email': [serializer.data.get("old_email")]
                    }
                    return Response(response)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ChangeFirstandLastView(generics.UpdateAPIView):
    """
    An endpoint for changing email inside of profile.
    """
    serializer_class = ChangeFullNameSerializer
    model = User
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self, queryset=None):
        obj = self.request.user
        return obj

    def update(self, request, *args, **kwargs):
        self.object = self.get_object()
        serializer = self.get_serializer(data=request.data)
        '''
        Cases:
         1. Update full name
        '''
        if serializer.is_valid():
            print(self.object.first_name)
            print(self.object.last_name)
            self.object.first_name = serializer.data.get("new_first_name")
            self.object.last_name = serializer.data.get("new_last_name")
            print(self.object.first_name)
            print(self.object.last_name)
            self.object.save()
            response = {
                'status': 'Success',
                'code': status.HTTP_200_OK,
                'message': 'Full name updated successfully',
                'email': []
            }
            return Response(response)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RetrieveRoleUserView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get(self, request):
        user = self.request.user

        return HttpResponse(UserAccount())
