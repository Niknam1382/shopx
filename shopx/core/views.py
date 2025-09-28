from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
# core/views.py
# قبلاً:
# from .models import Tenant, SiteSetting

# درست:
from dashboard.models import Tenant, SiteSetting
from .serializers import TenantSerializer, SiteSettingSerializer

class TenantViewSet(viewsets.ModelViewSet):
    queryset = Tenant.objects.all()
    serializer_class = TenantSerializer

class SiteSettingViewSet(viewsets.ModelViewSet):
    queryset = SiteSetting.objects.select_related('tenant').all()
    serializer_class = SiteSettingSerializer

    @action(detail=True, methods=['post'])
    def test_email(self, request, pk=None):
        setting = self.get_object()
        from notifications.email import send_test_email_with_config
        ok, msg = send_test_email_with_config(setting, request)
        code = status.HTTP_200_OK if ok else status.HTTP_400_BAD_REQUEST
        return Response({'success': ok, 'message': msg}, status=code)