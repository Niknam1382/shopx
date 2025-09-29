from django.contrib import admin
from django.urls import path, include
from core.routers import router as core_router
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/core/', include(core_router.urls)),
    path('api/dashboard/', include('dashboard.urls')),
    path('api/customers/', include('customers.urls')),
    path('api/catalog/', include('catalog.urls')),
    path('api/orders/', include('orders.urls')),
    path("api/customers/login/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/customers/refresh/", TokenRefreshView.as_view(), name="token_refresh"),

]