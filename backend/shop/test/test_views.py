from decimal import Decimal

from rest_framework.test import APIClient, APITestCase

from shop.models import Category, Product


class TestProductViewSet(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.url = "/v1/product/"
        self.category = Category.objects.create(
            name="Test Category", slug="test-category"
        )
        self.product = Product.objects.create(
            name="Test Product",
            slug="test-product",
            description="Test Product Description",
            price=Decimal("10.00"),
            available=True,
            category=self.category,
        )
        self.product2 = Product.objects.create(
            name="Test Product 2",
            slug="test-product-2",
            description="Test Product Description 2",
            price=Decimal("20.00"),
            available=True,
            category=self.category,
        )

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
        response = self.client.get(f"/v1/category/{self.category.slug}/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 2)
        self.assertEqual(response.json()[0]["name"], self.product2.name)

    def test_category_product_list_not_found(self):
        response = self.client.get(f"/v1/category/not-found/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 0)

    def test_category_list(self):
        response = self.client.get("/v1/category/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 1)
        self.assertEqual(response.json()[0]["name"], self.category.name)
