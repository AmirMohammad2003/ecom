from django.urls import path

from .views import OrderCreateView, OrderDetailsApi

app_name = "orders"

urlpatterns = [
    path("order/create/", OrderCreateView.as_view(), name="order_create"),
    path("order/", OrderDetailsApi.as_view(), name="order_details"),
]
