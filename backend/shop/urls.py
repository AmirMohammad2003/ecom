from email.mime import base

from django.conf import settings
from django.urls import path
from rest_framework.routers import DefaultRouter, SimpleRouter

from shop.views import CategoryProductListView, CategoryViewSet, ProductViewset

app_name = "shop"

if settings.DEBUG:
    router = DefaultRouter()
else:
    router = SimpleRouter()
router.register("product", ProductViewset, basename="product")
router.register("category", CategoryViewSet, basename="category")

routerUrls = router.get_urls()
urlpatterns = [
    path(
        "category/<slug:slug>/products/",
        CategoryProductListView.as_view(),
        name="product-category-list",
    ),
] + routerUrls
