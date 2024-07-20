from rest_framework import serializers, request
from django.contrib.auth import get_user_model
from copy import deepcopy
from django.contrib.auth import authenticate
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import User
from rest_framework.exceptions import ValidationError
from rest_framework import serializers
User = get_user_model()


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'email', 'first_name', 'last_name', 'city', 'street', 'houseNumber', 'phone', 'zipCode' )
        read_only_fields = ('id',)  


class RegisterSerializer(serializers.ModelSerializer):
    password1 = serializers.CharField()
    password2 = serializers.CharField()
    email = serializers.EmailField()

    def validate(self, data):
        if User.objects.filter(email=data["email"]).exists():
            raise ValidationError({"status": "user with this email already exists"})
        if data["password1"] != data["password2"]:
            raise ValidationError({"status": "Passwords not matching"})
        return data

    def create(self, validated_data):
        user_data = deepcopy(validated_data)
        user_data["password"] = user_data.pop("password1")
        user_data.pop("password2")
        user_data["username"] = user_data["email"]

        user = User.objects.create_user(**user_data)
        print(user)
        return user

    class Meta:
        model = User
        fields = ("email", "password1", "password2")
        write_only_fields = ("password1", "password2", "enable_email")


class AuthTokenSerializer(serializers.Serializer):
    email = serializers.CharField(label=_("Username"), write_only=True)
    password = serializers.CharField(
        label=_("Password"),
        style={"input_type": "password"},
        trim_whitespace=False,
        write_only=True,
    )
    token = serializers.CharField(label=_("Token"), read_only=True)

    def validate(self, attrs):
        email = attrs.get("email")
        password = attrs.get("password")

        if email and password:
            user = authenticate(
                request=self.context.get("request"), username=email, password=password
            )

            if not user:
                msg = _("Unable to log in with provided credentials.")
                raise serializers.ValidationError(msg, code="authorization")
        else:
            msg = _('Must include "username" and "password".')
            raise serializers.ValidationError(msg, code="authorization")

        attrs["user"] = user
        return attrs
