from decimal import Decimal

from django.conf import settings

from shop.models import Product


class Cart:
    def __init__(self, request):
        self.session = request.session
        cart = self.session.get(settings.CART_SESSION_ID)
        if not cart:
            cart = self.session[settings.CART_SESSION_ID] = {}

        self.cart = cart

    def add(self, product, quantity=1, override_quantity=False):
        product_id = str(product.id)
        if product_id not in self.cart:
            self.cart[product_id] = {"quantity": 0}

        if override_quantity:
            if quantity > 10:
                return False
            self.cart[product_id]["quantity"] = quantity
        else:
            if quantity + self.cart[product_id]["quantity"] > 10:
                return False
            self.cart[product_id]["quantity"] += quantity

        self.save()
        return True

    def remove(self, product):
        product_id = str(product.id)
        if product_id in self.cart:
            del self.cart[product_id]
            self.save()

    def clear(self):
        del self.session[settings.CART_SESSION_ID]
        self.save()

    def save(self):
        self.session.modified = True

    def __len__(self):
        return sum(item["quantity"] for item in self.cart.values())

    def __iter__(self):
        product_ids = self.cart.keys()
        products = Product.objects.filter(id__in=product_ids)
        cart = self.cart.copy()
        for product in products:
            item = cart[str(product.pk)]
            item["id"] = product.pk
            item["price"] = Decimal(product.price)
            item["total_price"] = item["price"] * item["quantity"]
            yield item
