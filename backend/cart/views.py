from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from cart.cart import Cart
from cart.serializers import CartAddSerializer
from shop.models import Product


class CartViewSet(viewsets.ViewSet):
    def list(self, request, format=None):
        cart = list(Cart(request))
        return Response(cart)

    @action(methods=["post"], detail=True)
    def add(self, request, pk=None, format=None):
        cart = Cart(request)
        product = get_object_or_404(Product, id=pk)
        serialized = CartAddSerializer(data=request.data)
        if serialized.is_valid():
            cd = serialized.validated_data
            success = cart.add(
                product=product,
                quantity=cd["quantity"],
                override_quantity=cd["override"],
            )

            if success:
                return Response({"message": "Item added to cart", "status": "success"})
            else:
                return Response(
                    {
                        "message": "You can't buy more than 10 of this item.",
                        "status": "failure",
                    }
                )

        return Response({"message": "Invalid data", "status": "failure"})

    @action(methods=["post"], detail=True)
    def remove(self, request, pk=None, format=None):
        cart = Cart(request)
        product = get_object_or_404(Product, id=pk)
        cart.remove(product)
        return Response(
            {"message": "Item was removed from the cart", "status": "success"}
        )

    @action(methods=["get"], detail=False)
    def size(self, request, format=None):
        cart = Cart(request)
        return Response({"size": len(cart)})