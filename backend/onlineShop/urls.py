from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path

from orders.views import AdminOrderDetail, AdminOrderPDF

urlpatterns = [
    path("admin/order/<pk>/", AdminOrderDetail.as_view(), name="admin_order_detail"),
    path("admin/order/<pk>/pdf/", AdminOrderPDF.as_view(), name="admin_order_pdf"),
    path("admin/", admin.site.urls),
    path("v1/", include("shop.urls")),
]

if settings.DEBUG:
    urlpatterns += [path("__debug__/", include("debug_toolbar.urls"))]
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
