import factory
from django.utils.text import slugify

from shop.models import Product


class ProductFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Product

    name = factory.Faker("word")
    slug = factory.LazyAttribute(lambda obj: slugify(obj.name))
    description = factory.Faker("text")
    price = factory.Faker("pydecimal", left_digits=5, right_digits=2, positive=True)
    available = factory.Faker("boolean")
    category = factory.SubFactory("shop.factories.CategoryFactory")
