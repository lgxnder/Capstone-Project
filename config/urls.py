from django.contrib import admin
from django.urls import path, include
from frontend.views import home_view, redirect_to_home_view

urlpatterns = [
    path('admin/', admin.site.urls),
	path('api/', include('backend.urls')), #API endpoints
	
    # frontend 
	path('', redirect_to_home_view, name='home_redirect'),
	path('home/', home_view, name='home'),
]
