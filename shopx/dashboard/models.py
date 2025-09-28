from django.db import models

class Tenant(models.Model):
    name = models.CharField(max_length=200)
    domain = models.CharField(max_length=255, unique=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.name} ({self.domain})'


class SiteSetting(models.Model):
    tenant = models.OneToOneField(
        Tenant,
        on_delete=models.CASCADE,
        related_name='settings'
    )
    schema = models.JSONField(default=dict, blank=True)
    values = models.JSONField(default=dict, blank=True)
    theme_tokens = models.JSONField(default=dict, blank=True)
    features = models.JSONField(default=dict, blank=True)
    email = models.JSONField(default=dict, blank=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'Settings for {self.tenant}'

    def get_email_config(self):
        return self.email or {}