from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet, ProductViewSet, VariantViewSet, ProductImageViewSet, CouponViewSet

router = DefaultRouter()
router.register(r'categories', CategoryViewSet)
router.register(r'products', ProductViewSet)
router.register(r'variants', VariantViewSet)
router.register(r'images', ProductImageViewSet)
router.register(r'coupons', CouponViewSet)

urlpatterns = [ path('', include(router.urls)) ]