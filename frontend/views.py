from django.shortcuts import render, redirect

def home_view(req):
	return render(req, 'frontend/index.html')

def redirect_to_home_view(req):
	return redirect("home")