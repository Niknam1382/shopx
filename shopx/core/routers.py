from rest_framework import routers
from .views import TenantViewSet, SiteSettingViewSet

router = routers.DefaultRouter()
router.register(r'tenants', TenantViewSet, basename='tenant')
router.register(r'settings', SiteSettingViewSet, basename='sitesetting')