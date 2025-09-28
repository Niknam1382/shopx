# core/admin.py
from django.contrib import admin
from dashboard.models import Tenant, SiteSetting   # 👈 مسیر درست
@admin.register(Tenant)
class TenantAdmin(admin.ModelAdmin):
    list_display = ('name','domain','is_active','created_at')
    search_fields = ('name','domain')
    list_filter = ('is_active',)

@admin.register(SiteSetting)
class SiteSettingAdmin(admin.ModelAdmin):
    list_display = ('tenant','updated_at')
    readonly_fields = ('updated_at',)