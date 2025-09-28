from rest_framework import serializers
from .models import Category, Product, Variant, ProductImage, Coupon

class ProductImageSerializer(serializers.ModelSerializer):
    class Meta: model = ProductImage; fields = ['id','image','alt','sort']

class VariantSerializer(serializers.ModelSerializer):
    class Meta: model = Variant; fields = ['id','sku','attrs','price','stock']

class ProductSerializer(serializers.ModelSerializer):
    variants = VariantSerializer(many=True, read_only=True)
    images = ProductImageSerializer(many=True, read_only=True)
    class Meta:
        model = Product
        fields = ['id','tenant','category','name','slug','base_price','data','is_active','created_at','variants','images']

class CategorySerializer(serializers.ModelSerializer):
    class Meta: model = Category; fields = ['id','tenant','name','slug','attr_schema','is_active']

class CouponSerializer(serializers.ModelSerializer):
    class Meta: model = Coupon; fields = ['id','tenant','code','type','value','is_active','expires_at']