from rest_framework import viewsets
from rest_framework import generics
from rest_framework.decorators import action
from rest_framework.response import Response


from .serializers import CategorySerializer, ProductSerializer

from shop.models import Category, Product

class ProductViewset(viewsets.ReadOnlyModelViewSet):
    queryset = Product.objects.filter(available=True).order_by('-created')
    serializer_class = ProductSerializer
    lookup_field = 'slug'

class CategoryListView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class CategoryProductListView(generics.ListAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        slug = self.kwargs['slug']
        return Product.objects.filter(category__slug=slug).order_by('-created')
