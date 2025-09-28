from django.urls import path
from .views import SiteValuesView

urlpatterns = [
    path('settings/values/', SiteValuesView.as_view(), name='settings-values'),
]