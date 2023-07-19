from decimal import Decimal

import stripe
from django.conf import settings
from django.shortcuts import redirect
from django.urls import reverse_lazy
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from orders.models import Order

stripe.api_key = settings.STRIPE_SECRET_KEY
stripe.api_version = settings.STRIPE_API_VERSION
endpoint_secret = settings.STRIPE_ENDPOINT_SECRET


class ProcessPayment(APIView):
    def post(self, request, format=None):
        order_id = request.session.get("order_id", None)

        if not order_id:
            return Response({"message": "Order not found."}, status=404)

        try:
            order = Order.objects.get(id=order_id)
        except Order.DoesNotExist:
            return Response({"message": "Order not found."}, status=404)

        success_url = settings.FRONTEND_URL + "/checkout/success/"
        cancel_url = settings.FRONTEND_URL + "/checkout/cancel/"
        try:
            session_data = {
                "mode": "payment",
                "success_url": success_url,
                "cancel_url": cancel_url,
                "client_reference_id": order.pk,
                "line_items": [],
            }
            for item in order.items.all():
                session_data["line_items"].append(
                    {
                        "price_data": {
                            "currency": "usd",
                            "unit_amount": int(item.price * Decimal(100)),
                            "product_data": {
                                "name": item.product.name,
                            },
                        },
                        "quantity": item.quantity,
                    }
                )
            session = stripe.checkout.Session.create(**session_data)

        except Exception as e:
            return Response(str(e))

        return Response({"url": session.url}, status=status.HTTP_200_OK)


class PaymentWebhook(APIView):
    def post(self, request, format=None):
        event = None
        payload = request.body
        sig_header = request.META["HTTP_STRIPE_SIGNATURE"]

        try:
            event = stripe.Webhook.construct_event(payload, sig_header, endpoint_secret)
        except ValueError as e:
            # Invalid payload
            raise e
        except stripe.error.SignatureVerificationError as e:
            # Invalid signature
            raise e

        # Handle the event
        if event.type == "checkout.session.completed":
            session = event.data.object
            if session.mode == "payment" and session.payment_status == "paid":
                try:
                    order = Order.objects.get(id=session.client_reference_id)
                except Order.DoesNotExist:
                    return Response(status=404)
                # mark order as paid
                order.paid = True
                order.save()
            print("checkout session completed!")
        else:
            print("Unhandled event type {}".format(event.type))

        return Response({"success": True})


class PaymentSuccess(APIView):
    def get(self, request, format=None):
        order_id = request.session.get("order_id", None)
        if order_id:
            try:
                order = Order.objects.get(id=order_id)
                if order.paid:
                    del request.session["order_id"]
                    request.session.modified = True
                    return Response({"message": "Payment successful."}, status=200)
            except Order.DoesNotExist:
                return Response(
                    {"message": "Order not found. Contact support"}, status=404
                )
        return Response(
            {"message": "Unauthorized attempt."}, status=status.HTTP_401_UNAUTHORIZED
        )
