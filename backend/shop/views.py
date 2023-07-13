from rest_framework import generics, viewsets

from shop.models import Category, Product

from .serializers import CategorySerializer, ProductSerializer


class ProductViewset(viewsets.ReadOnlyModelViewSet):
    queryset = (
        Product.objects.filter(available=True)
        .order_by("-created")
        .select_related("category")
    )
    serializer_class = ProductSerializer
    lookup_field = "slug"


class CategoryListView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class CategoryProductListView(generics.ListAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        slug = self.kwargs["slug"]
        return (
            Product.objects.filter(category__slug=slug)
            .order_by("-created")
            .select_related("category")
        )
