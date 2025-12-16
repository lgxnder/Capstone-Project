# from django.shortcuts import render
# from .models import Resource
# from .serializers import ResourceSerializer, ChatMessageSerializer

# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework import status
# from rest_framework import generics


# from .services.chatbot import generate_response


# class ChatMessageView(APIView):
#     def post(self, request):
#         message = request.data.get("message", "")
#         return Response({"reply": f"Echo: {message}"})


# class ResourceListView(generics.ListAPIView):
# 	queryset = Resource.objects.all().order_by('title')
# 	serializer_class = ResourceSerializer

# class ResourceDetailView(generics.RetrieveAPIView):
# 	queryset = Resource.objects.all()
# 	serializer_class = ResourceSerializer

# class ResourceSearchView(generics.ListAPIView):
# 	serializer_class = ResourceSerializer

# 	def get_queryset(self):
# 		query = self.request.query_params.get('q', None)
# 		if query:
# 			return Resource.objects.filter(title__icontains=query)
# 		return Resource.objects.none()




from django.db.models import Q
from .services.chatbot import generate_response
from .models import Resource
from .serializers import ResourceSerializer

class ChatMessageView(APIView):
    def post(self, request):
        user_message = request.data.get("message", "")
        
        # 1. Simple Keyword Search (The "RAG" part)
        # Look for resources where the title or tags match words in the user's message
        relevant_resources = Resource.objects.filter(
            Q(title__icontains=user_message) | 
            Q(tags__name__icontains=user_message)
        ).distinct()[:3] # Limit to top 3

        # 2. Serialize them to send to Frontend AND AI
        resource_data = ResourceSerializer(relevant_resources, many=True).data

        # 3. Generate AI Response using these resources as context
        ai_reply = generate_response(user_message, context_resources=relevant_resources)

        # 4. Return both the text reply AND the structured resource cards
        return Response({
            "reply": ai_reply,
            "resources": resource_data
        })