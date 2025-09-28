# core/middleware.py
from dashboard.models import Tenant

class TenantMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # اینجا می‌تونی tenant رو بر اساس دامنه یا هدر پیدا کنی
        host = request.get_host().split(':')[0]
        try:
            tenant = Tenant.objects.get(domain=host, is_active=True)
            request.tenant = tenant
        except Tenant.DoesNotExist:
            request.tenant = None

        response = self.get_response(request)
        return response