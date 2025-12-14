from rest_framework import serializers
from apps.api.models import Resource, Category, Tag, Source

class ChatMessageSerializer(serializers.Serializer):
    message = serializers.CharField()
    
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'description']

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'name']

class SourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Source
        fields = ['id', 'name', 'website', 'description']

class ResourceSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    tags = TagSerializer(many=True, read_only=True)
    source = SourceSerializer(read_only=True)

    class Meta:
        model = Resource
        fields = ['id', 'title', 'description', 'url', 'category', 'tags', 'source', 'created_at']