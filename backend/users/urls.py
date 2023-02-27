from django.urls import path
from .views import RegisterView, RetrieveUserView, RetrieveListOfUserView,RetrieveRoleUserView, csrf_token


urlpatterns = [
  path('register', RegisterView.as_view()),
  path('me', RetrieveUserView.as_view()),
  path('list-of-users',RetrieveListOfUserView.as_view()),
  path('role-permision-user/' , RetrieveRoleUserView.as_view()),
  path('csrf_token/' ,csrf_token  )  


  
]
