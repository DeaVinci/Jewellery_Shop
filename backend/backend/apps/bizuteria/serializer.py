from rest_framework import serializers
from bizuteria.models import Product, Order, Category, ProductReview
#from accounts.models import User


class ProductSerializer(serializers.ModelSerializer):
    category = serializers.SlugRelatedField(slug_field='name', queryset=Category.objects.all())
    
    class Meta:
        model = Product
        fields = ("id", "name", "price", "quantity", "short_description", "long_description", "image", "category", "created_at", "updated_at", "is_available", "slug")

class OrderSerializer(serializers.ModelSerializer):
    products = ProductSerializer(many=True)

    class Meta:
        model = Order
        fields = ("id", "city", "zip_code", "street", "house_number", "status", "products", "user", "total_price")



class OrderCreateSerializer(serializers.ModelSerializer):
    user = serializers.IntegerField(required=False, write_only=True)
    products_ids = serializers.ListField(write_only=True)

    def create(self, validated_data):
        validated_data["user"] = self.context["request"].user
        products_ids = validated_data.pop("products_ids")
        order = super().create(validated_data)
        total_price = 0
        for product_id, quantity in products_ids.items():
            product = Product.objects.get(id=product_id)
            order.products.add(product)
            total_price += product.price * quantity
        order.total_price = total_price
        order.save()
        return order

    class Meta:
        model = Order
        fields = ("id", "user", "products_ids", "city", "zip_code", "street", "house_number", "total_price")



class ProductReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductReview
        fields = ('id', 'product', 'user', 'rating', 'review_text', 'created_at')


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ("id", "name")

    def create(self, validated_data):
        return Category.objects.create(**validated_data)