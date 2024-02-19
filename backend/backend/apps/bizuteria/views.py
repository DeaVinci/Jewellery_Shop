from rest_framework.generics import ListAPIView, ListCreateAPIView
from bizuteria.serializer import ProductSerializer, OrderSerializer, OrderCreateSerializer, ProductReviewSerializer, CategorySerializer
from bizuteria.models import Product, Order, ProductReview, Category
from rest_framework.pagination import PageNumberPagination
from django_filters.rest_framework import DjangoFilterBackend
from bizuteria.filters import ProductFilter, OrderFilter, ProductReviewFilter, CategoryFilter
from rest_framework.permissions import IsAuthenticated

class ProductList(ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = ()
    pagination_class = PageNumberPagination
    filter_backends = (DjangoFilterBackend,)
    filterset_class = ProductFilter

class CategoryList(ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = ()
    pagination_class = PageNumberPagination
    filter_backends = (DjangoFilterBackend,)
    filterset_class = CategoryFilter

class RevievList(ListCreateAPIView):
    queryset = Reviev.objects.all()
    serializer_class = RevievSerializer
    permission_classes = ()
    pagination_class = PageNumberPagination
    filter_backends = (DjangoFilterBackend,)
    filterset_class = RevievFilter

class OrderList(ListCreateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = (IsAuthenticated,)
    pagination_class = PageNumberPagination
    filter_backends = (DjangoFilterBackend,)
    filterset_class = OrderFilter

    def get_queryset(self):
        return super().get_queryset().filter(user=self.request.user)

    def get_serializer_class(self):
        if self.request.method == "POST":
            serializer_class = OrderCreateSerializer
        else:
            serializer_class = self.serializer_class
        return serializer_class
    
class ProductReviewList(ListCreateAPIView):
    queryset = ProductReview.objects.all()
    serializer_class = ProductReviewSerializer
    permission_classes = ()
    pagination_class = PageNumberPagination
    filter_backends = (DjangoFilterBackend,)
    filterset_class = ProductReviewFilter


class CategoryList(ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = ()
    pagination_class = PageNumberPagination
    filter_backends = (DjangoFilterBackend,)
    filterset_class = CategoryFilter