from django.db.models import Q
from rest_framework import generics, viewsets

from shop.models import Category, Product

from .serializers import CategorySerializer, ProductSerializer


class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = (
        Product.objects.filter(available=True)
        .order_by("-created")
        .select_related("category")
    )
    serializer_class = ProductSerializer
    lookup_field = "slug"


class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    lookup_field = "slug"


class CategoryProductListView(generics.ListAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        slug = self.kwargs["slug"]
        return (
            Product.objects.filter(Q(category__slug=slug) & Q(available=True))
            .order_by("-created")
            .select_related("category")
        )
