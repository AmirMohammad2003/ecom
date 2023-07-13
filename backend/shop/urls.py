from django.conf import settings
from django.urls import path
from rest_framework.routers import DefaultRouter, SimpleRouter

from shop.views import (CategoryListView, CategoryProductListView,
                        ProductViewset)

app_name = "shop"

if settings.DEBUG:
    router = DefaultRouter()
else:
    router = SimpleRouter()
router.register("product", ProductViewset, basename="product")

routerUrls = router.get_urls()
urlpatterns = [
    path("category/", CategoryListView.as_view(), name="category-list"),
    path(
        "category/<slug:slug>/",
        CategoryProductListView.as_view(),
        name="product-category-list",
    ),
] + routerUrls
