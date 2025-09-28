from rest_framework import views, status, permissions
from rest_framework.response import Response

class IsStaffOrOwner(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and (request.user.is_staff or request.user.is_superuser)

class SiteValuesView(views.APIView):
    permission_classes = [IsStaffOrOwner]
    def get(self, request):
        t = getattr(request,'tenant',None)
        s = getattr(t,'settings',None) if t else None
        if not s: return Response({'detail':'تنظیمات یافت نشد.'}, status=404)
        return Response({'values': s.values,'theme_tokens': s.theme_tokens,'features': s.features,'email': s.email})
    def put(self, request):
        t = getattr(request,'tenant',None)
        s = getattr(t,'settings',None) if t else None
        if not s: return Response({'detail':'تنظیمات یافت نشد.'}, status=404)
        data = request.data
        s.values = data.get('values', s.values)
        s.theme_tokens = data.get('theme_tokens', s.theme_tokens)
        s.features = data.get('features', s.features)
        s.email = data.get('email', s.email)
        s.save()
        return Response({'detail':'ذخیره شد.'})