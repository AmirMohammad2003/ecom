from django.contrib.auth.mixins import UserPassesTestMixin
from django.views.generic import DetailView
from rest_framework import status
from rest_framework.exceptions import ValidationError
from rest_framework.generics import CreateAPIView
from rest_framework.response import Response
from rest_framework.views import APIView

from cart.cart import Cart
from orders.tasks import order_created
from shop.models import Product

from .models import Order, OrderItem
from .serializers import OrderSerializer


class OrderCreateApi(CreateAPIView):
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
        order_created.delay(order.pk)
        self.request.session["order_id"] = order.pk


class OrderDetailsApi(APIView):
    def get(self, request):
        order_id = request.session.get("order_id")
        if not order_id:
            return Response(
                {"message": "No order found"}, status=status.HTTP_404_NOT_FOUND
            )
        order = Order.objects.get(pk=order_id)
        if not order:
            return Response(
                {"message": "No order found"}, status=status.HTTP_404_NOT_FOUND
            )
        order_items = OrderItem.objects.filter(order=order)
        order_items = [
            {
                "name": item.product.name,
                "quantity": item.quantity,
                "price": item.price,
            }
            for item in order_items
        ]
        return Response(
            {
                "items": order_items,
                "total_price": order.get_total_cost(),
            },
            status=status.HTTP_200_OK,
        )


class AdminOrderDetail(UserPassesTestMixin, DetailView):
    model = Order
    template_name = "admin/orders/order/detail.html"

    def test_func(self):
        return self.request.user.is_superuser or self.request.user.is_staff
