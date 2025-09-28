import uuid
from decimal import Decimal
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Cart, CartItem, Order
from .serializers import CartSerializer, CartItemSerializer, AddToCartSerializer, CheckoutSerializer
from .services import checkout

class CartViewSet(viewsets.ModelViewSet):
    queryset = Cart.objects.prefetch_related('items')
    serializer_class = CartSerializer

    def create(self, request, *args, **kwargs):
        t = getattr(request,'tenant',None)
        token = uuid.uuid4().hex
        c = Cart.objects.create(tenant=t, user=request.user if request.user.is_authenticated else None, token=token)
        return Response(CartSerializer(c).data, status=201)

    @action(detail=True, methods=['post'])
    def add(self, request, pk=None):
        cart = self.get_object()
        ser = AddToCartSerializer(data=request.data)
        if ser.is_valid():
            v = ser.validated_data['variant']
            qty = ser.validated_data['qty']
            price = ser.validated_data['price']
            item = CartItem.objects.create(cart=cart, variant=v, qty=qty, price_snapshot=price)
            return Response(CartItemSerializer(item).data, status=201)
        return Response(ser.errors, status=400)

    @action(detail=True, methods=['post'])
    def checkout(self, request, pk=None):
        cart = self.get_object()
        ser = CheckoutSerializer(data=request.data)
        ser.is_valid(raise_exception=True)
        try:
            order = checkout(cart, request.user if request.user.is_authenticated else None, ser.validated_data.get('coupon'))
            # ارسال ایمیل تأیید
            from notifications.email import send_order_confirmation
            send_order_confirmation(order, request)
            return Response({'order_number': order.number, 'total': str(order.total)}, status=200)
        except Exception as e:
            return Response({'detail': str(e)}, status=400)

class OrderViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Order.objects.prefetch_related('items')
    serializer_class = None  # برای سادگی می‌توانی از CartSerializer الگوبرداری کنی یا خروجی ساده بدهی
    def list(self, request):
        qs = self.get_queryset()
        return Response([{'number':o.number,'status':o.status,'total':str(o.total)} for o in qs])