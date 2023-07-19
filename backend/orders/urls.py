from django.urls import path

from .views import OrderCreateApi, OrderDetailsApi

app_name = "orders"

urlpatterns = [
    path("order/create/", OrderCreateApi.as_view(), name="order_create"),
    path("order/", OrderDetailsApi.as_view(), name="order_details"),
]
