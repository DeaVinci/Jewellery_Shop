from rest_framework import serializers
from bizuteria.models import Product, Order
#from accounts.models import User


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ("id", "name", "price", "quantity", "description", "image", "category")


class OrderSerializer(serializers.ModelSerializer):
    products = ProductSerializer(many=True)

    class Meta:
        model = Order
        fields = (
            "id",
            "city",
            "zip_code",
            "street",
            "house_number",
            "status",
            "products",
            "user",
        )


class OrderCreateSerializer(serializers.ModelSerializer):
    user = serializers.IntegerField(required=False, write_only=True)
    products = serializers.IntegerField(required=False, write_only=True)
    products_ids = serializers.ListField(write_only=True)

    def create(self, validated_data):
        validated_data["user"] = self.context["request"].user
        products_ids = validated_data.pop("products_ids")
        order = super().create(validated_data)
        print(validated_data, products_ids)
        for product in products_ids:
            for product_id, quant in product.items():
                order.products.add(Product.objects.get(id=product["id"]))
        return order

    class Meta:
        model = Order
        fields = (
            "id",
            "user",
            "products",
            "city",
            "zip_code",
            "street",
            "house_number",
            "price",
            "products_ids",
        )
