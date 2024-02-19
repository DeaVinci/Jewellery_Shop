from django.contrib import admin

from bizuteria.models import Product, Order, Category, ProductReview

admin.site.register(Product)
admin.site.register(Order)
admin.site.register(Category)
admin.site.register(ProductReview)