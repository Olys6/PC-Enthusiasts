# Generated by Django 3.2.9 on 2021-12-06 15:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('builds', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='build',
            name='title',
            field=models.CharField(default=None, max_length=20),
        ),
    ]
