from django.db import models
from django.utils.translation import gettext_lazy as _

class Product(models.Model):
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.IntegerField()
    description = models.TextField()
    image = models.ImageField()
    category = models.ForeignKey('Category', to_field="name", on_delete=models.CASCADE)
    
class Category(models.Model):
    name = models.CharField(max_length=50, unique=True)

class Reviev(models.Model):
    user = models.ForeignKey(
        "accounts.user", on_delete=models.CASCADE, related_name="revievs"
    )
    product = models.ForeignKey("bizuteria.Product", on_delete=models.CASCADE, related_name='revievs')
    rating = models.IntegerField(choices=((1, '1'), (2, '2'), (3, '3'), (4, '4'), (5, '5')))
    content = models.TextField()
    date = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('product', 'user') 

    def __str__(self):
        return f'Recenzja użytkownika {self.user} dla produktu {self.product}'


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