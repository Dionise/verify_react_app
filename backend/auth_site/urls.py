from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView
from users.views import ChangePasswordView, ChangeEmailView, ChangeFirstandLastView
from django.conf import settings  # new
from django.conf.urls.static import static  # new
from django.urls import path


urlpatterns = [
    path('api/token/', TokenObtainPairView.as_view()),
    path('api/token/refresh/', TokenRefreshView.as_view()),
    path('api/token/verify/', TokenVerifyView.as_view()),
    path('api/password_reset/',
         include('django_rest_passwordreset.urls', namespace='password_reset')),
    path('admin/', admin.site.urls),

    path('api/change-password/', ChangePasswordView.as_view(),
         name='change-password'),
    path('api/change-email/', ChangeEmailView.as_view(), name='change-email'),
    path('api/change-full-name/',
         ChangeFirstandLastView.as_view(), name='change-email'),


    path('api-auth/', include('rest_framework.urls')),
    path('api/users/', include('users.urls')),
    path('api/propriety/', include('propriety.urls')),
   
   
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL,
                          document_root=settings.STATIC_ROOT)
