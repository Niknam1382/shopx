from django.db import models
from dashboard.models import Tenant


class Cart(models.Model):
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE)
    user = models.ForeignKey('auth.User', on_delete=models.SET_NULL, null=True, blank=True)
    token = models.CharField(max_length=64, unique=True)  # برای مهمان
    created_at = models.DateTimeField(auto_now_add=True)


class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name='items')
    variant = models.ForeignKey('catalog.Variant', on_delete=models.PROTECT)
    qty = models.PositiveIntegerField(default=1)
    price_snapshot = models.DecimalField(max_digits=12, decimal_places=2)


class Order(models.Model):
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE)
    user = models.ForeignKey('auth.User', on_delete=models.SET_NULL, null=True, blank=True)
    number = models.CharField(max_length=20, unique=True)
    status = models.CharField(max_length=20, default='pending')  # pending|paid|shipped|cancelled
    subtotal = models.DecimalField(max_digits=12, decimal_places=2)
    shipping_cost = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    discount = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    total = models.DecimalField(max_digits=12, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)


class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    variant = models.ForeignKey('catalog.Variant', on_delete=models.PROTECT)
    name = models.CharField(max_length=250)
    sku = models.CharField(max_length=64)
    qty = models.PositiveIntegerField()
    price = models.DecimalField(max_digits=12, decimal_places=2)