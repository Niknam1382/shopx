from django.urls import path
from .views import RegisterView, LoginView, profile
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    # ثبت‌نام و لاگین اختصاصی خودت
    path("register/", RegisterView.as_view(), name="register"),
    path("login/", LoginView.as_view(), name="login"),

    # JWT لاگین و رفرش (برای فرانت‌اند Next.js)
    path("jwt/login/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("jwt/refresh/", TokenRefreshView.as_view(), name="token_refresh"),

    # پروفایل تستی (فقط وقتی لاگین باشی جواب می‌ده)
    path("profile/", profile, name="profile"),
]