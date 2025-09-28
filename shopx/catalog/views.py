from rest_framework import viewsets, filters
from .models import Category, Product, Variant, ProductImage, Coupon
from .serializers import CategorySerializer, ProductSerializer, VariantSerializer, ProductImageSerializer, CouponSerializer

class TenantFilterMixin:
    def get_queryset(self):
        qs = super().get_queryset()
        t = getattr(self.request,'tenant',None)
        return qs.filter(tenant=t) if t and hasattr(qs.model,'tenant') else qs

class CategoryViewSet(TenantFilterMixin, viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name','slug']

class ProductViewSet(TenantFilterMixin, viewsets.ModelViewSet):
    queryset = Product.objects.select_related('category').prefetch_related('variants','images')
    serializer_class = ProductSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name','slug']

class VariantViewSet(viewsets.ModelViewSet):
    queryset = Variant.objects.select_related('product')
    serializer_class = VariantSerializer

class ProductImageViewSet(viewsets.ModelViewSet):
    queryset = ProductImage.objects.select_related('product')
    serializer_class = ProductImageSerializer

class CouponViewSet(TenantFilterMixin, viewsets.ModelViewSet):
    queryset = Coupon.objects.all()
    serializer_class = CouponSerializer