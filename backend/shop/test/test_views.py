from decimal import Decimal

from rest_framework.test import APIClient, APITestCase

from shop.factories import CategoryFactory, ProductFactory
from shop.models import Category, Product


class TestProductViewSet(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.url = "/v1/product/"
        self.category = CategoryFactory.create()
        self.product = ProductFactory.create(category=self.category, available=True)
        self.product2 = ProductFactory.create(category=self.category, available=True)
        self.product3 = ProductFactory.create(category=self.category, available=False)

    def test_list(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 2)
        self.assertEqual(response.json()[0]["name"], self.product2.name)

    def test_retrieve(self):
        response = self.client.get(f"{self.url}{self.product.slug}/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["name"], self.product.name)

    def test_retrieve_not_found(self):
        response = self.client.get(f"{self.url}not-found/")
        self.assertEqual(response.status_code, 404)

    def test_category_product_list(self):
        response = self.client.get(f"/v1/category/{self.category.slug}/products/")
        self.assertEqual(response.status_code, 200)
        ProductFactory.create(available=True)
        self.assertEqual(len(response.json()), 2)
        self.assertEqual(response.json()[0]["name"], self.product2.name)

    def test_category_product_list_not_found(self):
        response = self.client.get(f"/v1/category/not-found/products/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 0)

    def test_category_list(self):
        response = self.client.get("/v1/category/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 1)
        self.assertEqual(response.json()[0]["name"], self.category.name)
