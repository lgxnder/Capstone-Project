from django.urls import path
from . import views

urlpatterns = [
	path('test/', views.test_view, name='test'),
	path('resources/', views.ResourceListView.as_view(), name='resource-list'),
	path('resources/<int:pk>/', views.ResourceDetailView.as_view(), name='resource-detail'),
	path('resources/search/', views.ResourceSearchView.as_view(), name='resource-search'),
]