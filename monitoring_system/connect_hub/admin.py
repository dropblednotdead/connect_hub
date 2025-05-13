from django.contrib import admin
from .models import *
# Register your models here.


class UserInformationAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'surname', 'name', 'phone_num', 'type', 'accept_status', 'organization')
    search_fields = ('surname', 'name')


class ConnectionAdmin(admin.ModelAdmin):
    list_display = ('id', 'created_at', 'updated_at', 'provider', 'status')
    search_fields = ('provider', 'status')


class ConnectionHistoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'date', 'user', 'connection', 'status')
    search_fields = ('user', 'status')


class OrganizationAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'email', 'type', 'phone')
    search_fields = ('name', 'email')


class PoleAdmin(admin.ModelAdmin):
    list_display = ('id', 'longitude', 'latitude', 'street', 'building', 'index', 'max_connections', 'owner')
    search_fields = ('street', 'owner')


class ConnectionLinksAdmin(admin.ModelAdmin):
    list_display = ('id', 'connection', 'pole_link', 'pole_a_answer', 'pole_b_answer', 'status')
    search_fields = ('connection', 'pole_link', 'status')


class PoleLinkAdmin(admin.ModelAdmin):
    list_display = ('id', 'length', 'pole_a', 'pole_b')
    search_fields = ('pole_a', 'pole_b')


class StatusAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    search_fields = ('name',)


class ContactsAdmin(admin.ModelAdmin):
    list_display = ('id', 'city', 'street', 'building', 'index', 'email')
    search_fields = ('city', 'email')


class RestorationRequestAdmin(admin.ModelAdmin):
    list_display = ('id', 'email', 'date', 'status')
    search_fields = ('email', 'date')


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