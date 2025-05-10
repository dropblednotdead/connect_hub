from django.urls import path, include
from connect_hub import views

urlpatterns = [
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.authtoken')),

    path('contacts/', views.ContactsListAPIView.as_view()),
    path('restoration/', views.RestorationRequestCreateView.as_view()),
    path('pole_links/', views.PoleLinkListAPIView.as_view()),
    path('poles/', views.PoleAPIVIew.as_view()),
    path('poles/<int:pk>/', views.PoleAPIVIew.as_view()),
    path('connection/', views.ConnectionAPIView.as_view()),
    path('connection/<int:pk>/', views.ConnectionAPIView.as_view()),
]
