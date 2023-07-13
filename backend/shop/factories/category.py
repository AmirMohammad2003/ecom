import factory

from django.utils.text import slugify

from shop.models import Category

class CategoryFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Category
        django_get_or_create = ("name",)

    name = factory.Faker("word")
    slug = factory.LazyAttribute(lambda obj: slugify(obj.name))
