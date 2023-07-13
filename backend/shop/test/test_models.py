from django.test import TestCase

from shop.models import Category, Product


class TestCategory(TestCase):
    def setUp(self):
        self.category = Category.objects.create(name="django", slug="django")

    def test_get_absolute_url(self):
        self.assertEqual(self.category.get_absolute_url(), "/v1/category/django/")


class TestProduct(TestCase):
    def setUp(self):
        self.category = Category.objects.create(name="django", slug="django")
        self.product = Product.objects.create(
            category=self.category,
            name="django beginners",
            slug="django-beginners",
            price="20.00",
            available=True,
        )

    def test_get_absolute_url(self):
        self.assertEqual(
            self.product.get_absolute_url(), "/v1/product/django-beginners/"
        )

    def test_unique_slug(self):
        product2 = Product.objects.create(
            category=self.category,
            name="django beginners",
            slug="django-beginners",
            price="20.00",
            available=True,
        )
        self.assertNotEqual(self.product.slug, product2.slug)
