from django.db import models
from django.db.models import fields
from rest_framework import serializers

from components.serializers import ComponentSerializer
from .models import Build

class BuildSerializer(serializers.ModelSerializer):
    class Meta:
        model = Build
        fields = '__all__'

class populatedBuildSerializer(BuildSerializer):
    components = ComponentSerializer(read_only = True, many = True)