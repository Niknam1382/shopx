from rest_framework import serializers

class SiteValuesSerializer(serializers.Serializer):
    values = serializers.JSONField()
    theme_tokens = serializers.JSONField(required=False)
    features = serializers.JSONField(required=False)
    email = serializers.JSONField(required=False)