from django.contrib import admin
from .models import Category, Product, Variant, ProductImage, Coupon

admin.site.register(Category)
admin.site.register(Product)
admin.site.register(Variant)
admin.site.register(ProductImage)
admin.site.register(Coupon)