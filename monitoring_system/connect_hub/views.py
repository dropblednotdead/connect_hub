from django.db.models import Q
from django.shortcuts import render
from rest_framework.generics import GenericAPIView

from connect_hub.permissions import IsOwnerOrReadOnly, IsGridCompany
from connect_hub.serializers import *
from rest_framework.views import APIView
from rest_framework import viewsets, generics, mixins, permissions
from rest_framework.response import Response


class ContactsListAPIView(generics.ListAPIView):
    queryset = Contacts.objects.all()
    serializer_class = ContactsSerializer


class RestorationRequestCreateView(generics.CreateAPIView):
    queryset = RestorationRequest.objects.all()
    serializer_class = RestorationRequestSerializer


class PoleLinkListAPIView(generics.ListAPIView):
    queryset = PoleLink.objects.all()
    serializer_class = PoleLinkSerializer


class PoleAPIVIew(mixins.ListModelMixin, mixins.CreateModelMixin, mixins.RetrieveModelMixin, GenericAPIView):
    permission_classes = (IsOwnerOrReadOnly,)
    queryset = Pole.objects.all()
    serializer_class = PoleSerializer

    def get(self, request, *args, **kwargs):
        if not self.kwargs.get('pk'):
            return self.list(request, *args, **kwargs)
        else:
            return self.retrieve(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


class ConnectionAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get_permissions(self):
        if self.request.method.lower() == 'patch':
            return [permissions.IsAuthenticated(), IsGridCompany()]
        return super().get_permissions()

    
    def get_queryset(self, request):
        base_queryset = Connection.objects.all()

        if hasattr(request.user, 'user_info'):
            if request.user.user_info.type == 'магистральный провайдер':
                return base_queryset.filter(provider=request.user.user_info.organization)
            elif request.user.user_info.type == 'электросетевая компания':
                organization = request.user.user_info.organization
                return base_queryset.filter(
                    Q(connection_links__pole_link__pole_a__owner=organization) |
                    Q(connection_links__pole_link__pole_b__owner=organization)
                )
        return base_queryset

    def get(self, request):
        queryset = self.get_queryset(request)
        serializer = ConnectionSerializer(queryset, many=True, context={'request': request})
        return Response({'connections': serializer.data})

    def post(self, request):
        serializer = ConnectionSerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response({'new_connection': serializer.data})

    def patch(self, request, *args, **kwargs):
        pk = kwargs.get("pk", None)
        if not pk:
            return Response({'error': 'Метод patch не определен'})

        try:
            instance = Connection.objects.get(pk=pk)
        except:
            return Response({'error': 'Метод patch не определен'})

        serializer = ConnectionSerializer(data=request.data, instance=instance, context={'request': request})
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'connections': serializer.data})