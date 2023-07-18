from rest_framework.generics import CreateAPIView

from cart.cart import Cart

from .models import Order, OrderItem
from .serializers import OrderSerializer


class OrderCreateView(CreateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    def perform_create(self, serializer):
        serializer.save()
        order = Order.objects.get(pk=serializer.data["id"])
        cart = Cart(self.request)
        for key, item in cart.cart:
            OrderItem.objects.create(
                order=order,
                product_id=key,
                price=item["price"],
                quantity=item["quantity"],
            )
        cart.clear()
