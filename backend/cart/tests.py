from django.conf import settings
from django.contrib.sessions.backends.base import SessionBase
from django.http.request import HttpRequest
from rest_framework.test import APIClient, APITestCase

from shop.factories import ProductFactory

from .cart import Cart


class CartTest(APITestCase):
    def setUp(self):
        self.client = APIClient()
        request = HttpRequest()
        self.session = SessionBase()
        setattr(request, "session", self.session)
        self.cart = Cart(request)
        self.product = ProductFactory.create()

    def test_cart_creation(self):
        self.assertTrue(settings.CART_SESSION_ID in self.session)

    def test_add_success(self):
        self.cart.add(self.product, 1, False)
        self.assertTrue(str(self.product.pk) in self.cart.cart)
        self.assertEqual(self.cart.cart[str(self.product.pk)]["quantity"], 1)
        self.cart.add(self.product, 2, False)
        self.assertEqual(self.cart.cart[str(self.product.pk)]["quantity"], 3)
        self.cart.add(self.product, 2, True)
        self.assertEqual(self.cart.cart[str(self.product.pk)]["quantity"], 2)

    def test_add_failure(self):
        self.cart.add(self.product, 11, True)
        self.assertTrue(str(self.product.pk) not in self.cart.cart)
        self.cart.add(self.product, 9, False)
        self.cart.add(self.product, 2, False)
        self.assertTrue(str(self.product.pk) in self.cart.cart)
        self.assertTrue(self.cart.cart[str(self.product.pk)]["quantity"], 10)

    def test_remove(self):
        self.cart.add(self.product, 1, False)
        self.cart.remove(self.product)
        self.assertTrue(str(self.product.pk) not in self.cart.cart)

    def test_clear(self):
        self.cart.add(self.product, 1, False)
        self.cart.clear()
        self.assertTrue(settings.CART_SESSION_ID not in self.session)

    def test_len(self):
        self.cart.add(self.product, 1, False)
        self.cart.add(self.product, 2, False)
        self.cart.add(ProductFactory.create(), 1, False)
        self.assertEqual(len(self.cart), 4)

    def test_iter(self):
        self.cart.add(self.product, 1, False)
        self.cart.add(self.product, 2, False)
        self.cart.add(ProductFactory.create(), 1, False)
        for item in self.cart:
            self.assertTrue("slug" in item)
            self.assertTrue("quantity" in item)
            self.assertTrue("price" in item)

    def test_total_price(self):
        self.cart.add(self.product, 1, False)
        self.cart.add(self.product, 2, False)
        product2 = ProductFactory.create()
        self.cart.add(product2, 1, False)
        self.assertEqual(
            self.cart.get_total_price(), 3 * self.product.price + product2.price
        )
