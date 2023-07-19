from django.urls import path

from .views import PaymentSuccess, PaymentWebhook, ProcessPayment

app_name = "payment"

urlpatterns = [
    path("payment/process/", ProcessPayment.as_view(), name="process"),
    path("payment/post-process/", PaymentSuccess.as_view(), name="post-process"),
    path("payment/webhook/", PaymentWebhook.as_view(), name="webhook"),
]
