from django.urls import path
from bizuteria import views

urlpatterns = [
    path("products/", views.ProductList.as_view(), name="product-list"),
    path("order/", views.OrderList.as_view(), name="order-list"),
    path("category/", views.CategoryList.as_view(), name="category-list"),
    path("reviev/", views.RevievList.as_view(), name="reviev-list"),
]