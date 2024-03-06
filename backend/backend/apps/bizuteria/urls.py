from django.urls import path
from bizuteria import views

urlpatterns = [
    path("product/", views.ProductList.as_view(), name="product-list"),
    path("order/", views.OrderList.as_view(), name="order-list"),
    path("reviews/", views.ProductReviewList.as_view(), name="product-review-list"),
    path("categories/", views.CategoryList.as_view(), name="category-list"),
]