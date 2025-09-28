from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.conf import settings

def apply_email_config(setting):
    email_conf = setting.email or {}
    settings.EMAIL_HOST = email_conf.get('host', settings.EMAIL_HOST)
    settings.EMAIL_PORT = int(email_conf.get('port', settings.EMAIL_PORT or 587))
    settings.EMAIL_HOST_USER = email_conf.get('user', settings.EMAIL_HOST_USER)
    settings.EMAIL_HOST_PASSWORD = email_conf.get('password', settings.EMAIL_HOST_PASSWORD)
    settings.EMAIL_USE_TLS = email_conf.get('use_tls', True)
    settings.DEFAULT_FROM_EMAIL = email_conf.get('from_email', settings.DEFAULT_FROM_EMAIL)

def send_test_email_with_config(setting, request):
    try:
        apply_email_config(setting)
        subject = 'تست ارسال ایمیل'
        to = [setting.values.get('contact_email', 'test@example.com')]
        html = render_to_string('emails/test_email.html', {'tenant': setting.tenant})
        msg = EmailMultiAlternatives(subject, 'Email test', settings.DEFAULT_FROM_EMAIL, to)
        msg.attach_alternative(html, "text/html")
        msg.send()
        return True, 'ایمیل تست با موفقیت ارسال شد.'
    except Exception as e:
        return False, f'خطا: {e}'

def send_order_confirmation(order, request):
    t = getattr(request,'tenant',None)
    s = getattr(t,'settings',None) if t else None
    if not s: return
    apply_email_config(s)
    subject = f'تأیید سفارش #{order.number}'
    to = [s.values.get('contact_email', 'test@example.com')]
    html = render_to_string('emails/order_confirmation.html', {'order': order, 'tenant': t})
    msg = EmailMultiAlternatives(subject, f'Order {order.number}', settings.DEFAULT_FROM_EMAIL, to)
    msg.attach_alternative(html, "text/html")
    msg.send()