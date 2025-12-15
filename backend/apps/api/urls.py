from django.urls import path
from .views import ChatMessageView

urlpatterns = [
	path("chat/", ChatMessageView.as_view()),
	
	#path('resources/', views.ResourceListView.as_view(), name='resource-list'),
	#path('resources/<int:pk>/', views.ResourceDetailView.as_view(), name='resource-detail'),
	path('resources/search/', views.ResourceSearchView.as_view(), name='resource-search'),
]