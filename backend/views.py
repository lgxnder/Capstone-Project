from django.shortcuts import render
from django.http import HttpResponse

def test_view(req):
	return render(req, 'backend/test.html')