from django.conf.urls import url
from django.urls import path
from . import views

app_name = 'chat'

urlpatterns = [
    path('', views.index, name='index'),
    path('<slug:room_name>/', views.room, name='room'),
]
