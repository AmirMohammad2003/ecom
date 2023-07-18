from rest_framework.exceptions import ValidationError
from rest_framework.generics import CreateAPIView

from cart.cart import Cart
from shop.models import Product

from .models import Order, OrderItem
from .serializers import OrderSerializer


class OrderCreateView(CreateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    def perform_create(self, serializer):
        cart = Cart(self.request)
        if not cart.cart:
            raise ValidationError("Cart is empty")
        serializer.save()
        order = Order.objects.get(pk=serializer.data["id"])
        products = Product.objects.filter(id__in=cart.cart.keys())
        for product in products:
            product_id = str(product.pk)
            OrderItem.objects.create(
                order=order,
                product_id=product.pk,
                price=product.price,
                quantity=cart.cart[product_id]["quantity"],
            )
        cart.clear()
