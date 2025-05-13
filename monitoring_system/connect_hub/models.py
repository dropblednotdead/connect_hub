# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models
from django.contrib.auth.models import User


class Connection(models.Model):
    id = models.BigAutoField(primary_key=True)
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Дата создания')
    updated_at = models.DateTimeField(blank=True, null=True, verbose_name='Дата изменения')
    provider = models.ForeignKey('Organization', models.DO_NOTHING, db_column='provider', verbose_name='Провайдер')
    status = models.ForeignKey('Status', models.DO_NOTHING, db_column='status', verbose_name='Статус')

    class Meta:
        managed = True
        db_table = 'connection'
        verbose_name = 'Подключение'
        verbose_name_plural = 'Подключения'
        ordering = ['-created_at', 'id']

    def __str__(self):
        return f"{self.created_at} {self.provider}"


class ConnectionHistory(models.Model):
    id = models.BigAutoField(primary_key=True)
    date = models.DateTimeField(verbose_name='Дата')
    user = models.ForeignKey('UserInformation', models.DO_NOTHING, db_column='user', verbose_name='Пользователь')
    status = models.ForeignKey('Status', models.DO_NOTHING, db_column='status', verbose_name='Статус')
    connection = models.ForeignKey('Connection', models.DO_NOTHING, db_column='connection', verbose_name='Подключение')

    class Meta:
        managed = True
        db_table = 'connection_history'
        verbose_name = 'История подключения'
        verbose_name_plural = 'История подключений'
        ordering = ['date', 'id']

    def __str__(self):
        return f'{self.date} {self.connection} {self.status}'


class Organization(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=255, verbose_name='Название')
    email = models.CharField(max_length=255)
    type = models.CharField(choices=[('магистральный провайдер', 'магистральный провайдер'), ('электросетевая компания', 'электросетевая компания')], max_length=50, verbose_name='Тип')
    phone = models.CharField(max_length=50, verbose_name='Телефон')

    class Meta:
        managed = True
        db_table = 'organization'
        verbose_name = 'Организация'
        verbose_name_plural = 'Организации'
        ordering = ['id']

    def __str__(self):
        return self.name


class Pole(models.Model):
    id = models.BigAutoField(primary_key=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, verbose_name='Долгота')
    latitude = models.DecimalField(max_digits=9, decimal_places=6, verbose_name='Широта')
    street = models.CharField(max_length=100, verbose_name='Улица')
    building = models.IntegerField(verbose_name='Дом')
    index = models.CharField(max_length=1, blank=True, null=True, verbose_name='Индекс')
    max_connections = models.IntegerField(verbose_name='Максимальное количество подключений')
    owner = models.ForeignKey('Organization', models.DO_NOTHING, db_column='owner', verbose_name='Владелец')

    class Meta:
        managed = True
        db_table = 'pole'
        verbose_name = 'Опора'
        verbose_name_plural = 'Опоры'
        ordering = ['id']

    def __str__(self):
        if self.index is not None:
            return f"ул. {self.street}, д. {self.building}{self.index}, {self.owner}"
        else:
            return f"ул. {self.street}, д. {self.building}, {self.owner}"


class ConnectionLinks(models.Model):
    id = models.BigAutoField(primary_key=True)
    status = models.ForeignKey('Status', models.DO_NOTHING, blank=True, null=True, db_column='status', verbose_name='Статус')
    pole_a_answer = models.BooleanField(blank=True, null=True, verbose_name='Ответ по первой опоре')
    pole_b_answer = models.BooleanField(blank=True, null=True, verbose_name='Ответ по второй опоре')
    connection = models.ForeignKey('Connection', models.DO_NOTHING, db_column='connection',related_name='connection_links', verbose_name='Подключение')
    pole_link = models.ForeignKey('PoleLink', models.DO_NOTHING, db_column='pole_link', related_name='connection_links', verbose_name='Связь опор')

    class Meta:
        managed = True
        db_table = 'connection_links'
        verbose_name = 'Связи опор в подключении'
        verbose_name_plural = 'Связи опор в подключениях'
        ordering = ['id']

    def __str__(self):
        return f"{self.connection} {self.pole_link}"


class PoleLink(models.Model):
    id = models.BigAutoField(primary_key=True)
    length = models.DecimalField(max_digits=5,decimal_places=2, verbose_name='Протяженность')
    pole_a = models.ForeignKey('Pole', models.DO_NOTHING, db_column='pole_a', verbose_name='Первая опора')
    pole_b = models.ForeignKey('Pole', models.DO_NOTHING, db_column='pole_b', related_name='pole_b', verbose_name='Вторая опора')

    class Meta:
        managed = True
        db_table = 'pole_link'
        verbose_name = 'Связь опор'
        verbose_name_plural = 'Связи опор'
        ordering = ['id']

    def __str__(self):
        return f'{self.pole_a} {self.pole_b}'


class Status(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=100, verbose_name='Значение')

    class Meta:
        managed = True
        db_table = 'status'
        verbose_name = 'Статус'
        verbose_name_plural = 'Статусы'
        ordering = ['id']

    def __str__(self):
        return self.name


class UserInformation(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.OneToOneField(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='user_info', verbose_name='Пользователь')
    surname = models.CharField(max_length=100, null=True, blank=True, verbose_name='Фамилия')
    name = models.CharField(max_length=100, null=True, blank=True, verbose_name='Имя')
    phone_num = models.CharField(max_length=20, verbose_name='Номер телефона')
    type = models.CharField(choices=[('магистральный провайдер', 'магистральный провайдер'), ('электросетевая компания', 'электросетевая компания')], max_length=50, verbose_name='Тип организации')
    accept_status = models.CharField(choices=[('Ожидание', 'Ожидание'), ('Принято', 'Принято'), ('Отклонено', 'Отклонено')], default='Ожидание', max_length=20, verbose_name='Статус подтверждения')
    organization = models.ForeignKey('Organization', models.DO_NOTHING, db_column='organization', verbose_name='Организация')

    class Meta:
        managed = True
        db_table = 'user_information'
        verbose_name = 'Информация о пользователе'
        verbose_name_plural = 'Информация о пользователях'
        ordering = ['id']

    def __str__(self):
        return f'{self.name} {self.surname} {self.organization}'


class Contacts(models.Model):
    id = models.BigAutoField(primary_key=True)
    city = models.CharField(max_length=50, verbose_name='Город')
    street = models.CharField(max_length=50, verbose_name='Улица')
    building = models.IntegerField(verbose_name='Дом')
    index = models.CharField(max_length=1, blank=True, null=True, verbose_name='Индекс')
    email = models.CharField(max_length=150, blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'contacts'
        verbose_name = 'Контакт'
        verbose_name_plural = 'Контакты'
        ordering = ['id']

    def __str__(self):
        if self.index is not None:
            return f"г. {self.city}, ул. {self.street}, д. {self.building}{self.index}"
        else:
            return f"г. {self.city}, ул. {self.street}, д. {self.building}"


class RestorationRequest(models.Model):
    id = models.BigAutoField(primary_key=True)
    email = models.CharField(max_length=150)
    date = models.DateTimeField(auto_now_add=True, verbose_name='Дата')
    status = models.CharField(choices=[('Ожидание', 'Ожидание'), ('Принято', 'Принято'), ('Отклонено', 'Отклонено')], default='Ожидание', max_length=50, verbose_name='Статус')

    class Meta:
        managed = True
        db_table = 'restoration_request'
        verbose_name = 'Заявка на восстановление'
        verbose_name_plural = 'Заявки на восстановление'
        ordering = ['id']

    def __str__(self):
        return f"{self.date} {self.email} {self.status}"
