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
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(blank=True, null=True)
    provider = models.ForeignKey('Organization', models.DO_NOTHING, db_column='provider')
    pole_a_answer = models.BooleanField(blank=True, null=True)
    pole_b_answer = models.BooleanField(blank=True,null=True)
    status = models.ForeignKey('Status', models.DO_NOTHING, db_column='status')

    class Meta:
        managed = True
        db_table = 'connection'

    def __str__(self):
        return f"{self.created_at}"


class ConnectionHistory(models.Model):
    id = models.BigAutoField(primary_key=True)
    date = models.DateTimeField()
    user = models.ForeignKey('UserInformation', models.DO_NOTHING, db_column='user')
    pole_a_answer = models.BooleanField(blank=True, null=True)
    pole_b_answer = models.BooleanField(blank=True, null=True)
    status = models.ForeignKey('Status', models.DO_NOTHING, db_column='status')
    connection = models.ForeignKey('Connection', models.DO_NOTHING, db_column='connection')

    class Meta:
        managed = True
        db_table = 'connection_history'

    def __str__(self):
        return f'{self.date}'


class Organization(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=255)
    email = models.CharField(max_length=255)
    type = models.CharField(max_length=50)
    phone = models.CharField(max_length=50)

    class Meta:
        managed = True
        db_table = 'organization'

    def __str__(self):
        return self.name


class Pole(models.Model):
    id = models.BigAutoField(primary_key=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6)
    latitude = models.DecimalField(max_digits=9, decimal_places=6)
    street = models.CharField(max_length=100)
    building = models.IntegerField()
    index = models.CharField(max_length=1, blank=True, null=True)
    max_connections = models.IntegerField()
    owner = models.ForeignKey('Organization', models.DO_NOTHING, db_column='owner')

    class Meta:
        managed = True
        db_table = 'pole'

    def __str__(self):
        return f'{self.street} {self.building}'


class ConnectionLinks(models.Model):
    id = models.BigAutoField(primary_key=True)
    connection = models.ForeignKey('Connection', models.DO_NOTHING, db_column='connection', related_name='connection_links')
    pole_link = models.ForeignKey('PoleLink', models.DO_NOTHING, db_column='pole_link', related_name='connection_links')

    class Meta:
        managed = True
        db_table = 'connection_links'


class PoleLink(models.Model):
    id = models.BigAutoField(primary_key=True)
    length = models.DecimalField(max_digits=5,decimal_places=2)
    pole_a = models.ForeignKey('Pole', models.DO_NOTHING, db_column='pole_a')
    pole_b = models.ForeignKey('Pole', models.DO_NOTHING, db_column='pole_b', related_name='pole_b')

    class Meta:
        managed = True
        db_table = 'pole_link'

    def __str__(self):
        return f'{self.length}'


class Status(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=100)

    class Meta:
        managed = True
        db_table = 'status'

    def __str__(self):
        return self.name


class UserInformation(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.OneToOneField(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='user_info')
    surname = models.CharField(max_length=100, null=True, blank=True)
    name = models.CharField(max_length=100, null=True, blank=True)
    phone_num = models.CharField(max_length=20)
    type = models.CharField(max_length=50)
    accept_status = models.CharField(max_length=20, default='Ожидание')
    organization = models.ForeignKey('Organization', models.DO_NOTHING, db_column='organization')

    class Meta:
        managed = True
        db_table = 'user_information'

    def __str__(self):
        return f'{self.name} {self.surname}'


class Contacts(models.Model):
    id = models.BigAutoField(primary_key=True)
    city = models.CharField(max_length=50)
    street = models.CharField(max_length=50)
    building = models.IntegerField()
    index = models.CharField(max_length=1, blank=True, null=True)
    email = models.CharField(max_length=150, blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'contacts'

    def __str__(self):
        if self.index is not None:
            return f"г. {self.city}, ул. {self.street}, д. {self.building}{self.index}"
        else:
            return f"г. {self.city}, ул. {self.street}, д. {self.building}"


class RestorationRequest(models.Model):
    id = models.BigAutoField(primary_key=True)
    email = models.CharField(max_length=150)
    date = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=50, default='Ожидание')

    class Meta:
        managed = True
        db_table = 'restoration_request'

    def __str__(self):
        return f"{self.email}"
