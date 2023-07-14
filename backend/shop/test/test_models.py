from django.test import TestCase

from shop.factories import CategoryFactory, ProductFactory
from shop.models import Category, Product


class TestCategory(TestCase):
    def setUp(self):
        self.category = CategoryFactory.create()

    def test_get_absolute_url(self):
        self.assertEqual(
            self.category.get_absolute_url(),
            f"/v1/category/{self.category.slug}/products/",
        )


class TestProduct(TestCase):
    def setUp(self):
        self.product = ProductFactory.create()

    def test_get_absolute_url(self):
        self.assertEqual(
            self.product.get_absolute_url(), f"/v1/product/{self.product.slug}/"
        )

    def test_unique_slug(self):
        product2 = ProductFactory.create(name=self.product.name)
        self.assertNotEqual(self.product.slug, product2.slug)
