from django.contrib import admin
from django.urls import path, include
from core.routers import router as core_router

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/core/', include(core_router.urls)),
    path('api/dashboard/', include('dashboard.urls')),
    path('api/customers/', include('customers.urls')),
    path('api/catalog/', include('catalog.urls')),
    path('api/orders/', include('orders.urls')),
]