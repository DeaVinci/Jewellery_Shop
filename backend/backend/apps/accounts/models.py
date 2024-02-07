from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission


class User(AbstractUser):
    image = models.ImageField(blank=True, null=True)
    age = models.DateField(blank=True, null=True)
