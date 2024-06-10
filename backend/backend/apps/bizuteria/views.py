from rest_framework.generics import ListAPIView, ListCreateAPIView, RetrieveAPIView, GenericAPIView
from bizuteria.serializer import ProductSerializer, OrderSerializer, OrderCreateSerializer, ProductReviewSerializer, CategorySerializer
from bizuteria.models import Product, Order, ProductReview, Category
from rest_framework.pagination import PageNumberPagination
from django_filters.rest_framework import DjangoFilterBackend
from bizuteria.filters import ProductFilter, OrderFilter, ProductReviewFilter, CategoryFilter
from rest_framework.permissions import IsAuthenticated
from rest_framework.filters import SearchFilter
import logging

logger = logging.getLogger(__name__)

class ProductList(ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = ()
    pagination_class = PageNumberPagination
    filter_backends = (DjangoFilterBackend,)
    filterset_class = ProductFilter

class ProductDetail(RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = ()
    filter_backends = (DjangoFilterBackend,)
    filterset_class = ProductFilter

    def get_object(self):
        queryset = self.filter_queryset(self.get_queryset())
        # Pobierz ID produktu z parametru URL
        pk = self.kwargs.get('pk')
        # Filtruj queryset, aby zwrócić tylko produkt o określonym ID
        obj = queryset.filter(pk=pk).first()
        return obj
    
class ProductCategory(ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = ()
    pagination_class = PageNumberPagination
    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_fields = ['category__name']  # Filtruj po nazwie kategorii
    search_fields = ['name', 'short_description']  # Wyszukaj po nazwie i krótkim opisie

    def get_queryset(self):
        queryset = super().get_queryset()
        category_name = self.kwargs.get('category')
        return queryset.filter(category__name=category_name)

class OrderList(ListCreateAPIView):
    queryset = Order.objects.all()
    permission_classes = (IsAuthenticated,)
    pagination_class = PageNumberPagination
    filter_backends = (DjangoFilterBackend,)
    filterset_class = OrderFilter

    def get_queryset(self):
        queryset = super().get_queryset().filter(user=self.request.user)
        logger.info(f'Orders for user {self.request.user}: {queryset}')
        return queryset

    def get_serializer_class(self):
        if self.request.method == "POST":
            return OrderCreateSerializer
        return OrderSerializer
    
class ProductReviewList(ListCreateAPIView):
    queryset = ProductReview.objects.all()
    serializer_class = ProductReviewSerializer
    permission_classes = ()
    pagination_class = PageNumberPagination
    filter_backends = (DjangoFilterBackend,)
    filterset_class = ProductReviewFilter


class CategoryList(ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = ()
    pagination_class = PageNumberPagination
    filter_backends = (DjangoFilterBackend,)
    filterset_class = CategoryFilter