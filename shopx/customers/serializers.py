from django.contrib.auth.models import User
from rest_framework import serializers
from django.contrib.auth import authenticate

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    class Meta: model = User; fields = ['id','username','email','password']
    def create(self, data):
        return User.objects.create_user(username=data['username'], email=data.get('email',''), password=data['password'])

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)
    def validate(self, data):
        user = authenticate(username=data['username'], password=data['password'])
        if not user: raise serializers.ValidationError('نام کاربری یا رمز عبور نادرست است.')
        data['user'] = user
        return data