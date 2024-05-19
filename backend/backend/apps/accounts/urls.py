from django.urls import path
from accounts.views import RegisterView, LoginView, UserProfileView# UserProfileUpdateView

urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),
    path("login/", LoginView.as_view(), name="login"),
    path("user/profile/", UserProfileView.as_view(), name="user_profile"),
    #path("user/profile/update", UserProfileUpdateView.as_view(), name="user_update")
]
