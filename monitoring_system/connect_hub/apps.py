from django.apps import AppConfig


class ConnectHubConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'connect_hub'
    verbose_name = 'Сервис Connect Hub'

    def ready(self):
        import connect_hub.signals