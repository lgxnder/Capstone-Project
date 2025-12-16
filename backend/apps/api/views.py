from django.shortcuts import render
from .models import Resource
from .serializers import ResourceSerializer, ChatMessageSerializer

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics


from .services.chatbot import generate_response


class ChatMessageView(APIView):
    def post(self, request):
        message = request.data.get("message", "")
        return Response({"reply": f"Echo: {message}"})


class ResourceListView(generics.ListAPIView):
	queryset = Resource.objects.all().order_by('title')
	serializer_class = ResourceSerializer

class ResourceDetailView(generics.RetrieveAPIView):
	queryset = Resource.objects.all()
	serializer_class = ResourceSerializer

class ResourceSearchView(generics.ListAPIView):
	serializer_class = ResourceSerializer

	def get_queryset(self):
		query = self.request.query_params.get('q', None)
		if query:
			return Resource.objects.filter(title__icontains=query)
		return Resource.objects.none()