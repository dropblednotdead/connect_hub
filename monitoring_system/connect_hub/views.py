from django.db.models import Q
from django.shortcuts import render
from rest_framework.generics import GenericAPIView

from connect_hub.permissions import IsOwnerOrReadOnly, IsGridCompany, IsAuthenticatedAndAccepted, IsProvider
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
        if self.request.method.lower() == 'post':
            return [IsAuthenticatedAndAccepted(), IsProvider()]
        if self.request.method.lower() == 'patch':
            return [IsAuthenticatedAndAccepted(), IsGridCompany()]
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
                ).distinct()
        return base_queryset

    def get(self, request, *args, **kwargs):
        if self.kwargs.get('pk'):
            queryset = self.get_queryset(request).get(pk=self.kwargs.get('pk'))
            if not queryset:
                return Response({'error': 'У вас нет доступа к информации о подключении'})
            else:
                serializer = ConnectionSerializer(queryset, many=False, context={'request': request})
        else:
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


class ConnectionLinksAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get_permissions(self):
        if self.request.method.lower() == 'patch':
            return [permissions.IsAuthenticated(), IsGridCompany()]
        return super().get_permissions()

    def get_queryset(self, request):
        base_queryset = ConnectionLinks.objects.all()

        if hasattr(request.user, 'user_info'):
            if request.user.user_info.type == 'магистральный провайдер':
                return base_queryset.filter(connection__provider=request.user.user_info.organization)
            elif request.user.user_info.type == 'электросетевая компания':
                organization = request.user.user_info.organization
                return base_queryset.filter(
                    Q(pole_link__pole_a__owner=organization) |
                    Q(pole_link__pole_b__owner=organization)
                    )
        return base_queryset

    def get(self, request, *args, **kwargs):
        if self.kwargs.get('pk'):
            queryset = self.get_queryset(request).filter(pk=self.kwargs.get('pk')).first()
            if not queryset:
                return Response({'error': 'У вас нет доступа к информации по линии опор'})
            else:
                serializer = ConnectionLinksSerializer(queryset, many=False, context={'request': request})
        else:
            queryset = self.get_queryset(request)
            serializer = ConnectionLinksSerializer(queryset, many=True, context={'request': request})
        return Response({'connection_links': serializer.data})

    def patch(self, request, *args, **kwargs):
        pk = kwargs.get("pk", None)
        if not pk:
            return Response({'error': 'Метод patch не определен'}, status=400)

        instance = self.get_queryset(request).filter(pk=pk).first()
        if not instance:
            return Response({'error': 'Объект не найден или у вас нет доступа'}, status=404)

        serializer = ConnectionLinksSerializer(data=request.data, instance=instance, context={'request': request})
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'connections': serializer.data})

class OrganizationListAPIView(mixins.ListModelMixin, mixins.RetrieveModelMixin, GenericAPIView):
    queryset = Organization.objects.all()
    serializer_class = OrganizationSerializer

    def get(self, request, *args, **kwargs):
        if not self.kwargs.get('pk'):
            return self.list(request, *args, **kwargs)
        else:
            return self.retrieve(request, *args, **kwargs)