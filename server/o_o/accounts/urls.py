from django.conf.urls import url
from django.urls import path
from . import views

app_name = 'accounts'

urlpatterns = [
    path('login/', views.Login.as_view(), name='login'),
    path('signup/', views.Signup.as_view(), name='signup'),
    path('logout/', views.Logout.as_view(), name='logout'),
    path('checkLoginStatus/', views.CheckLoginStatus.as_view(), name='checkLoginStatus'),
    path('userList/', views.UserList.as_view(), name='userList'),
    path('deleteUser/<int:pk>/', views.DeleteUser.as_view(), name='deleteUser'),
]
