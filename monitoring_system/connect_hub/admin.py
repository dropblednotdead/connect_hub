from django.contrib import admin
from unfold.admin import ModelAdmin
from django.contrib.auth.models import User, Group
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.admin import GroupAdmin as BaseGroupAdmin
from .models import *
# Register your models here.

admin.site.unregister(User)
admin.site.unregister(Group)

@admin.register(User)
class UserAdmin(BaseUserAdmin, ModelAdmin):
    pass

@admin.register(Group)
class GroupAdmin(BaseGroupAdmin, ModelAdmin):
    pass

class UserInformationAdmin(ModelAdmin):
    list_display = ('id', 'user', 'surname', 'name', 'phone_num', 'type', 'accept_status', 'organization')
    search_fields = ('surname', 'name')


class ConnectionAdmin(ModelAdmin):
    list_display = ('id', 'created_at', 'updated_at', 'provider', 'status')
    search_fields = ('provider', 'status')


class ConnectionHistoryAdmin(ModelAdmin):
    list_display = ('id', 'date', 'user', 'connection', 'status')
    search_fields = ('user', 'status')


class OrganizationAdmin(ModelAdmin):
    list_display = ('id', 'name', 'email', 'type', 'phone')
    search_fields = ('name', 'email')


class PoleAdmin(ModelAdmin):
    list_display = ('id', 'longitude', 'latitude', 'street', 'building', 'index', 'max_connections', 'owner')
    search_fields = ('street', 'owner')


class ConnectionLinksAdmin(ModelAdmin):
    list_display = ('id', 'connection', 'pole_link', 'pole_a_answer', 'pole_b_answer', 'status')
    search_fields = ('connection', 'pole_link', 'status')


class PoleLinkAdmin(ModelAdmin):
    list_display = ('id', 'length', 'pole_a', 'pole_b')
    search_fields = ('pole_a', 'pole_b')


class StatusAdmin(ModelAdmin):
    list_display = ('id', 'name')
    search_fields = ('name',)


class ContactsAdmin(ModelAdmin):
    list_display = ('id', 'city', 'street', 'building', 'index', 'email')
    search_fields = ('city', 'email')


class RestorationRequestAdmin(ModelAdmin):
    list_display = ('id', 'email', 'date', 'status')
    search_fields = ('email', 'date')


class AdminPoleMessageAdmin(ModelAdmin):
    list_display = ('id', 'pole', 'created_at')
    search_fields = ('pole__street', 'message')

class SupportMessageAdmin(ModelAdmin):
    pass

admin.site.register(UserInformation, UserInformationAdmin)
admin.site.register(Connection, ConnectionAdmin)
admin.site.register(ConnectionHistory, ConnectionHistoryAdmin)
admin.site.register(Organization, OrganizationAdmin)
admin.site.register(Pole, PoleAdmin)
admin.site.register(ConnectionLinks, ConnectionLinksAdmin)
admin.site.register(PoleLink, PoleLinkAdmin)
admin.site.register(Status, StatusAdmin)
admin.site.register(Contacts, ContactsAdmin)
admin.site.register(RestorationRequest, RestorationRequestAdmin)
admin.site.register(SupportMessage, SupportMessageAdmin)
admin.site.register(AdminPoleMessage, AdminPoleMessageAdmin)

admin.site.site_header = 'CONNECT HUB'
admin.site.site_title = 'CONNECT HUB'