from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission


class User(AbstractUser):
    city = models.CharField(max_length=30, default='Opole')
    street = models.CharField(max_length=30, default='Powstańców Śląskich')
    houseNumber = models.IntegerField(default=2)
    zipCode = models.CharField(max_length=10, default='42-323')
    phone = models.CharField(max_length=15, default='123123123')
    image = models.ImageField(blank=True, null=True)
    age = models.DateField(blank=True, null=True)
