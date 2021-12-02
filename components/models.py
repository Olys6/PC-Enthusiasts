from django.db import models

# Create your models here.
class Component(models.Model):
    title = models.CharField(max_length=200, default=None)
    description = models.TextField()
    image = models.CharField(max_length=1000, default=None)
    types = (
        ('Processor', 'CPU'),
        ('Motherboard', 'MB'),
        ('Graphics Card', 'GPU'),
        ('Case', 'CASE'),
        ('Memory', 'RAM'),
        ('Storage', 'STO'),
    )
    component_type = models.CharField(max_length=300, choices = types)
    price = models.IntegerField()
    place_to_buy = models.CharField(max_length=1000, default=None)

    def __str__(self):
        return self.title

