from rest_framework import serializers
from bizuteria.models import Product, Order, Category, ProductReview, OrderProduct
import requests
from django.conf import settings
import logging
from decimal import Decimal
from django.core.serializers.json import DjangoJSONEncoder
import uuid

logger = logging.getLogger(__name__)

class ProductSerializer(serializers.ModelSerializer):
    category = serializers.SlugRelatedField(slug_field='name', queryset=Category.objects.all())

    class Meta:
        model = Product
        fields = '__all__'

class OrderProductSerializer(serializers.ModelSerializer):
    product = serializers.StringRelatedField()

    class Meta:
        model = OrderProduct
        fields = ['product', 'quantity']

class OrderSerializer(serializers.ModelSerializer):
    order_products = OrderProductSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = ['id', 'user', 'city', 'zipCode', 'street', 'houseNumber', 'status', 'created_at', 'subtotal', 'order_products']

class UUIDEncoder(DjangoJSONEncoder):
    def default(self, obj):
        if isinstance(obj, uuid.UUID):
            return str(obj)
        return super().default(obj)

class OrderCreateSerializer(serializers.ModelSerializer):
    user = serializers.IntegerField(required=False, write_only=True)
    products_ids = serializers.ListField(
        child=serializers.DictField(
            child=serializers.CharField()
        ), write_only=True
    )
    subtotal = serializers.FloatField()

    def create(self, validated_data):
        validated_data["user"] = self.context["request"].user
        products_ids = validated_data.pop("products_ids")
        subtotal = validated_data.pop("subtotal")
        order = super().create(validated_data)
        total_price = Decimal(0)

        for item in products_ids:
            product_name = item["name"]
            quantity = item["quantity"]
            product = Product.objects.get(name=product_name)
            OrderProduct.objects.create(order=order, product=product, quantity=quantity)
            total_price += product.price * Decimal(quantity)

        order.subtotal = total_price
        order.save()

        logger.info(f"Order created: {order.id}, total price: {order.subtotal}")

        # Send confirmation email using EmailJS
        self.send_confirmation_email(order, products_ids)

        return order

    def send_confirmation_email(self, order, product_list):
        service_id = settings.EMAILJS_SERVICE_ID
        template_id = settings.EMAILJS_TEMPLATE_ID
        user_id = settings.EMAILJS_USER_ID

        product_details = []
        for item in product_list:
            product = Product.objects.get(name=item["name"])
            product_details.append(f"{product.name} (Quantity: {item['quantity']})")

        email_data = {
            'service_id': service_id,
            'template_id': template_id,
            'user_id': user_id,
            'template_params': {
                'user_email': order.user.email,
                'user_name': order.user.username,
                'order_id': str(order.id),
                'order_total': float(order.subtotal),
                'order_products': "\n".join(product_details),
                'order_date': order.created_at.strftime("%Y-%m-%d %H:%M:%S"),
                'user_city': order.city,
                'user_zip_code': order.zipCode,
                'user_street': order.street,
                'user_house_number': order.houseNumber
            }
        }

        logger.info(f"Sending email to: {order.user.email} with data: {email_data}")

        response = requests.post('https://api.emailjs.com/api/v1.0/email/send', json=email_data)
        if response.status_code != 200:
            logger.error(f"Failed to send confirmation email for order {order.id}. Response: {response.text}")
        else:
            logger.info(f"Email sent successfully for order {order.id}. Response: {response.text}")

    class Meta:
        model = Order
        fields = '__all__'

    class Meta:
        model = Order
        fields = '__all__'
        json_encoders = {
            uuid.UUID: UUIDEncoder
        }


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
