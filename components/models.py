from django.db import models

# Create your models here.
class Component(models.Model):
    title = models.CharField(max_length=200, default=None)
    description = models.TextField()
    image = models.CharField(max_length=1000, default=None)
    types = (
        ('1', 'PROCESSOR'),
        ('2', 'MOTHERBOARD'),
        ('3', 'GRAPHICS CARD'),
        ('4', 'CASE'),
        ('5', 'MEMORY'),
        ('6', 'STORAGE'),
    )
    component_type = models.CharField(max_length=300, choices = types)
    price = models.IntegerField()
    place_to_buy = models.CharField(max_length=1000, default=None)

    def __str__(self):
        return self.title

