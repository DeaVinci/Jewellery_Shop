from django.contrib import admin
from django.contrib.admin import AdminSite
from django.urls import path
from django.conf.urls.static import static
from django.conf import settings

from bizuteria.models import Product, Order, Category, ProductReview, OrderProduct

class MyAdminSite(AdminSite):
    site_header = "Your Admin"
    site_title = "Admin Portal"
    index_title = "Welcome to Your Admin"

    def get_urls(self):
        urls = super().get_urls()
        custom_urls = [
            path('custom-css/', self.admin_view(self.custom_css_view), name="custom_css"),
        ]
        return custom_urls + urls

    def custom_css_view(self, request):
        from django.http import HttpResponse
        response = HttpResponse(content_type="text/css")
        response.write("/* your CSS */")
        return response

admin_site = MyAdminSite(name='myadmin')

class OrderProductInline(admin.TabularInline):
    model = OrderProduct
    extra = 1
    fields = ['product', 'quantity']

class OrderAdmin(admin.ModelAdmin):
    inlines = [OrderProductInline]
    list_display = ['id', 'user', 'city', 'status', 'created_at', 'subtotal']
    search_fields = ['user__username', 'city', 'status']
    list_filter = ['status', 'created_at']
    ordering = ['created_at']

admin.site.register(Product)
admin.site.register(Order, OrderAdmin)
admin.site.register(Category)
admin.site.register(ProductReview)