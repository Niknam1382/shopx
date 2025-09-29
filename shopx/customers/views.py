from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from django.contrib.auth import login
from .serializers import RegisterSerializer, LoginSerializer

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def profile(request):
    return Response({"username": request.user.username, "email": request.user.email})

class RegisterView(APIView):
    permission_classes = [permissions.AllowAny]
    def post(self, request):
        ser = RegisterSerializer(data=request.data)
        if ser.is_valid():
            u = ser.save()
            return Response({'id': u.id, 'username': u.username}, status=201)
        return Response(ser.errors, status=400)

class LoginView(APIView):
    permission_classes = [permissions.AllowAny]
    def post(self, request):
        ser = LoginSerializer(data=request.data)
        if ser.is_valid():
            login(request, ser.validated_data['user'])
            return Response({'message':'ورود موفق'}, status=200)
        return Response(ser.errors, status=400)