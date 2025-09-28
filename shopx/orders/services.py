import uuid
from decimal import Decimal
from django.db import transaction
from catalog.models import Coupon

def generate_order_number(): return str(uuid.uuid4())[:8].upper()

def apply_coupon(tenant, subtotal, code=None):
    if not code: return Decimal('0')
    c = Coupon.objects.filter(tenant=tenant, code=code, is_active=True).first()
    if not c: return Decimal('0')
    if c.type == 'percent': return (subtotal * c.value) / Decimal('100')
    return min(c.value, subtotal)

def shipping_cost_for(tenant, subtotal):
    return Decimal('0') if subtotal >= Decimal('500000') else Decimal('30000')

@transaction.atomic
def checkout(cart, user=None, coupon_code=None):
    items = list(cart.items.select_related('variant','variant__product'))
    subtotal = sum([i.price_snapshot * i.qty for i in items], Decimal('0'))
    discount = apply_coupon(cart.tenant, subtotal, coupon_code)
    shipping = shipping_cost_for(cart.tenant, subtotal - discount)
    total = subtotal - discount + shipping

    from .models import Order, OrderItem
    order = Order.objects.create(
        tenant=cart.tenant, user=user, number=generate_order_number(),
        status='pending', subtotal=subtotal, shipping_cost=shipping,
        discount=discount, total=total
    )
    for i in items:
        v = i.variant
        # کاهش موجودی
        if v.stock < i.qty: raise ValueError('موجودی کافی نیست.')
        v.stock -= i.qty; v.save()
        OrderItem.objects.create(
            order=order, variant=v, name=v.product.name, sku=v.sku,
            qty=i.qty, price=i.price_snapshot
        )
    # خالی کردن سبد
    cart.items.all().delete()
    return order