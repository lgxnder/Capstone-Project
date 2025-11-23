from django.db import models
from django.utils import timezone


class User(models.Model):
	user_id = models.AutoField(primary_key=True)
	session_id = models.CharField(max_length=255, unique=True, blank=True, null=True)
	timestamp = models.DateTimeField(auto_now_add=True)

	def __str__(self):
		return f"User ID: {self.user_id} | Session: {self.session_id or 'None'}"