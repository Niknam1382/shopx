from rest_framework import serializers
from .models import Cart, CartItem, Order, OrderItem
from catalog.models import Variant

class CartItemSerializer(serializers.ModelSerializer):
    class Meta: model = CartItem; fields = ['id','variant','qty','price_snapshot']

class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)
    class Meta: model = Cart; fields = ['id','tenant','user','token','created_at','items']

class AddToCartSerializer(serializers.Serializer):
    variant_id = serializers.IntegerField()
    qty = serializers.IntegerField(min_value=1)
    def validate(self, data):
        v = Variant.objects.get(id=data['variant_id'])
        data['variant'] = v
        data['price'] = v.price if v.price is not None else v.product.base_price
        return data

class CheckoutSerializer(serializers.Serializer):
    coupon = serializers.CharField(required=False, allow_blank=True)