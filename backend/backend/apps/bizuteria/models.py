from django.db import models
from django.utils.translation import gettext_lazy as _

class Product(models.Model):
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.IntegerField()
    description = models.TextField()
    image = models.ImageField()
    category = models.ForeignKey('Kategoria', on_delete=models.CASCADE)
    
class Kategoria(models.Model):
    name = models.CharField(max_length=50)

class Order(models.Model):
    class OrderStatus(models.TextChoices):
        PAID = "P", _("Paid")
        REALIZATION = "R", _("In realization")
        SENT = "S", _("Sent")

    user = models.ForeignKey(
        "accounts.User", on_delete=models.CASCADE, related_name="orders"
    )
    products = models.ManyToManyField(Product, related_name="orders")
    city = models.CharField(max_length=512)
    zip_code = models.CharField(max_length=64)
    street = models.CharField(max_length=128)
    house_number = models.CharField(max_length=64)
    status = models.CharField(
        max_length=1, choices=OrderStatus.choices, default=OrderStatus.PAID
    )