from django.db.models.signals import post_save
from django.utils import timezone
from djoser.signals import user_registered
from django.dispatch import receiver
from .models import UserInformation, Organization, Connection, ConnectionHistory, Status
from django.contrib.auth.models import User


@receiver(user_registered)
def create_user_information(sender, user, request, **kwargs):
    data = request.data
    phone_num = data.get('phone_num')
    org_id = data.get('organization_id')
    user_type = data.get('type')
    name = data.get('name')
    surname = data.get('surname')

    if phone_num and org_id and user_type and name and surname:
        UserInformation.objects.create(
            user=user,
            phone_num=phone_num,
            organization_id=org_id,
            type=user_type,
            name=name,
            surname=surname
        )


@receiver(post_save, sender=Connection)
def create_connection_history(sender, instance, created, **kwargs):
    user = getattr(instance, '_current_user', None)

    ConnectionHistory.objects.create(
        connection=instance,
        pole_a_answer=instance.pole_a_answer,
        pole_b_answer=instance.pole_b_answer,
        status=instance.status,
        date=timezone.now(),
        user=user
    )

@receiver(post_save, sender=Connection)
def update_connection_status(sender, instance, **kwargs):
    new_status = instance.status
    if instance.pole_a_answer is False or instance.pole_b_answer is False:
        new_status = Status.objects.get(name='отклонено')
    elif instance.pole_a_answer is True and instance.pole_b_answer is True:
        new_status = Status.objects.get(name='одобрено')

    if instance.status != new_status:
        instance.status = new_status
        instance.save(update_fields=['status'])