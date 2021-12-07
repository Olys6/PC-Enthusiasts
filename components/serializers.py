from django.db import models
from django.db.models import fields
from rest_framework import serializers
from .models import Component

class ComponentSerializer(serializers.ModelSerializer):
    serializers.StringRelatedField(many = True)
    class Meta:
        model = Component
        fields = '__all__'