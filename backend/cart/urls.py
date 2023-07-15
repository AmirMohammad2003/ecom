from django.conf import settings
from rest_framework.routers import DefaultRouter, SimpleRouter

from cart.views import CartViewSet

app_name = "cart"

router = DefaultRouter() if settings.DEBUG else SimpleRouter()
router.register("cart", CartViewSet, "cart")
urlpatterns = router.urls
