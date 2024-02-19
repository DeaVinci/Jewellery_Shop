from rest_framework import generics
from django_filters import rest_framework as filters
from bizuteria.models import Product, Order, Category, ProductReview


class ProductFilter(filters.FilterSet):
    name = filters.CharFilter(field_name="name", lookup_expr="icontains")

    class Meta:
        model = Product
        fields = ["name"]

class CategoryFilter(filters.FilterSet):
    name = filters.CharFilter(field_name="name", lookup_expr="icontains")

    class Meta:
        model = Category
        fields = ["name"]

class OrderFilter(filters.FilterSet):
    products = filters.CharFilter(lookup_expr="icontains", field_name="products__name")
    status = filters.ChoiceFilter(choices=Order.OrderStatus.choices)

    class Meta:
        model = Order
        fields = ["products", "status"]

class ProductReviewFilter(filters.FilterSet):
    class Meta:
        model = ProductReview
        fields = ['product']


class CategoryFilter(filters.FilterSet):
    name = filters.CharFilter(field_name="name", lookup_expr="icontains")

    class Meta:
        model = Category
        fields = ["name"]