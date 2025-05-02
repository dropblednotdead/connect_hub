from django.utils import timezone
from rest_framework import serializers
from connect_hub.models import *


class ContactsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contacts
        fields = ['city','street','building','index','email']


class RestorationRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = RestorationRequest
        fields = ['email', 'date', 'status']

    def validate_email(self, value):
        if not User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Пользователь с такой почтой не существует.")
        return value


class ConnectionSerializer(serializers.ModelSerializer):
    pole_links = serializers.ListField(
        child=serializers.IntegerField(), write_only=True, required=False
    )

    class Meta:
        model = Connection
        fields = ['id', 'created_at', 'updated_at', 'provider', 'status', 'pole_links', 'pole_a_answer', 'pole_b_answer']
        read_only_fields = ['provider', 'status', 'created_at', 'updated_at']

    def create(self, validated_data):
        pole_link_ids = validated_data.pop('pole_links')

        existing_links = PoleLink.objects.filter(id__in=pole_link_ids)
        if existing_links.count() != len(pole_link_ids):
            raise serializers.ValidationError("Некоторые pole_link_id не существуют.")

        validated_data['provider'] = self.context['request'].user.user_info.organization
        validated_data['status'] = Status.objects.first()
        connection = Connection(**validated_data)
        connection._current_user = self.context['request'].user.user_info
        connection.save()

        for pole_link_id in pole_link_ids:
            ConnectionLinks.objects.create(
                connection=connection,
                pole_link=PoleLink.objects.get(pk=pole_link_id)
            )

        return connection

    def update(self, instance, validated_data):
        validated_data['updated_at'] = timezone.now()
        instance._current_user = self.context['request'].user.user_info
        connection = super().update(instance, validated_data)
        return connection


class OwnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Organization
        fields = ['name', 'email', 'phone']


class PoleSerializer(serializers.ModelSerializer):
    owner = OwnerSerializer(read_only=True)
    owner_id = serializers.PrimaryKeyRelatedField(
        queryset=Organization.objects.all(), source='owner', write_only=True
    )

    class Meta:
        model = Pole
        fields = ['id','longitude', 'latitude', 'street', 'building', 'index', 'max_connections', 'owner', 'owner_id']


class PoleLinkSerializer(serializers.ModelSerializer):
    pole_a = PoleSerializer(read_only=True)
    pole_b = PoleSerializer(read_only=True)

    class Meta:
        model = PoleLink
        fields = '__all__'
