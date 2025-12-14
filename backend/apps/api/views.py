from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics
from .models import Resource
from .serializers import ResourceSerializer


def test_view(req):
	return render(req, 'backend/test.html')

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