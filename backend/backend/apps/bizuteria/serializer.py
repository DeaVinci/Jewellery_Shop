from rest_framework import serializers
from bizuteria.models import Product, Order, Category, ProductReview, OrderProduct


class ProductSerializer(serializers.ModelSerializer):
    category = serializers.SlugRelatedField(slug_field='name', queryset=Category.objects.all())

    class Meta:
        model = Product
        fields = ("id", "name", "price", "quantity", "short_description", "long_description", "image", "category", "created_at", "updated_at", "is_available", "slug")


class OrderSerializer(serializers.ModelSerializer):
    products = ProductSerializer(many=True)

    class Meta:
        model = Order
        fields = ("id", "city", "zipCode", "street", "houseNumber", "status", "products", "user", "subtotal")


class OrderCreateSerializer(serializers.ModelSerializer):
    user = serializers.IntegerField(required=False, write_only=True)
    products_ids = serializers.ListField(
        child=serializers.DictField(
            child=serializers.IntegerField()
        ), write_only=True
    )
    subtotal = serializers.FloatField()

    def create(self, validated_data):
        validated_data["user"] = self.context["request"].user
        products_ids = validated_data.pop("products_ids")
        subtotal = validated_data.pop("subtotal")
        order = super().create(validated_data)
        total_price = 0
        for item in products_ids:
            product_id = item["id"]
            quantity = item["quantity"]
            product = Product.objects.get(id=product_id)
            OrderProduct.objects.create(order=order, product=product, quantity=quantity)
            total_price += product.price * quantity
        order.subtotal = total_price
        order.save()
        return order

    class Meta:
        model = Order
        fields = (
            "id", "user", "products_ids", "city", "zipCode",
            "street", "houseNumber", "subtotal"
        )


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
