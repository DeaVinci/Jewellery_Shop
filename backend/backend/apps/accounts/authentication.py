from rest_framework import authentication
from rest_framework.authtoken.models import Token
from rest_framework.exceptions import AuthenticationFailed


class TokenAuthentication(authentication.BaseAuthentication):
    def authenticate(self, request=None, token=None):
        if request:
            token = request.META.get("HTTP_TOKEN")
        elif token:
            token = token
        if not token:
            return None
        try:
            token = Token.objects.get(key=token)
        except Token.DoesNotExist:
            raise AuthenticationFailed("User with this token does not exist")
        return token.user, None
