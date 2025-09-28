from django.core.mail.backends.smtp import EmailBackend
from dashboard.models import SiteSetting

class DynamicEmailBackend(EmailBackend):
    def __init__(self, *args, **kwargs):
        # گرفتن تنظیمات ایمیل از اولین SiteSetting (یا Tenant جاری)
        site_settings = SiteSetting.objects.first()
        email_cfg = site_settings.get_email_config() if site_settings else {}

        kwargs.update(
            host=email_cfg.get("host", "smtp.gmail.com"),
            port=email_cfg.get("port", 587),
            username=email_cfg.get("user"),
            password=email_cfg.get("password"),
            use_tls=email_cfg.get("use_tls", True),
        )
        super().__init__(*args, **kwargs)