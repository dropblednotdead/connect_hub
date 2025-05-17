from django.urls import path, include
from connect_hub import views

urlpatterns = [
    path('contacts/', views.ContactsListAPIView.as_view()),
    path('restoration/', views.RestorationRequestCreateView.as_view()),
    path('pole_links/', views.PoleLinkListAPIView.as_view()),
    path('poles/', views.PoleAPIVIew.as_view()),
    path('poles/<int:pk>/', views.PoleAPIVIew.as_view()),
    path('connection/', views.ConnectionAPIView.as_view()),
    path('connection/<int:pk>/', views.ConnectionAPIView.as_view()),
    path('connection_links/', views.ConnectionLinksAPIView.as_view()),
    path('connection_links/<int:pk>/', views.ConnectionLinksAPIView.as_view()),
    path('organizations/', views.OrganizationListAPIView.as_view()),
    path('organizations/<int:pk>/', views.OrganizationListAPIView.as_view()),
]
