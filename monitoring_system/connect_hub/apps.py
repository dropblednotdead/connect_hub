from django.apps import AppConfig


class ConnectHubConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'connect_hub'

    def ready(self):
        import connect_hub.signals