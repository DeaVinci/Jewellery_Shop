from accounts.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework import status
from accounts.models import User
from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView, ListCreateAPIView, RetrieveAPIView, UpdateAPIView, RetrieveUpdateAPIView
from rest_framework.response import Response

from accounts.serializers import RegisterSerializer, AuthTokenSerializer, UserSerializer

class UserProfileView(RetrieveUpdateAPIView):
    authentication_classes = [TokenAuthentication]  # Uwierzytelnienie za pomocą tokenu
    permission_classes = [AllowAny]  # Tylko zalogowani użytkownicy mogą uzyskać dostęp do tego widoku
    serializer_class = UserSerializer

    def get(self, request, *args, **kwargs):
        # Pobierz dane użytkownika na podstawie tokenu
        user = request.user
        print(request.user)
        serializer = self.serializer_class(user)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def get_object(self):
        return self.request.user
    
#class UserProfileUpdateView(UpdateAPIView):
#    serializer_class = UserSerializer
#    authentication_classes = [TokenAuthentication]
#    permission_classes = [AllowAny]
#
#    def get_object(self):
#        return self.request.user
#
#    def put(self, request, *args, **kwargs):
#        serializer = self.get_serializer(instance=self.request.user, data=request.data)
#        serializer.is_valid(raise_exception=True)
#        serializer.save()
#        return Response(serializer.data)

class RegisterView(CreateAPIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = ()
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({"user": user.email, "token": user.auth_token.key})


class LoginView(ObtainAuthToken):
    serializer_class = AuthTokenSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(
            data=request.data, context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]
        token, created = Token.objects.get_or_create(user=user)
        return Response({"token": token.key, "user_id": user.pk, "email": user.email})
