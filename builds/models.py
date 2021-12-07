from django.db import models
from django import forms
from django.db.models.fields.related import ForeignKey

# Create your models here.
class Build(models.Model):
    title = models.CharField(max_length=20, default=None)
    # user = models.ForeignKey('jwt_auth.User', on_delete=models.CASCADE)
    user = models.CharField(max_length=50, default=None)
    components = models.ManyToManyField("components.Component", blank=False)
    
    def __str__(self):
        return f'{self.user}, {self.title}' 