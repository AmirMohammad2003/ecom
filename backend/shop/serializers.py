from rest_framework import serializers

from .models import Category, Product


class ProductSerializer(serializers.ModelSerializer):
    category = serializers.SerializerMethodField("get_category_slug")

    class Meta:
        model = Product
        lookup_field = "slug"
        fields = [
            "id",
            "name",
            "slug",
            "description",
            "price",
            "image",
            "category",
        ]

    def get_category_slug(self, obj):
        return obj.category.slug


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = [
            "name",
            "slug",
        ]
