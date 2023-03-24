# Generated by Django 4.0.5 on 2023-03-18 20:28

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('propriety', '0002_remove_location_latitude_remove_location_longitude_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='location',
            name='details',
            field=models.JSONField(default=None, null=True),
        ),
        migrations.AddField(
            model_name='location',
            name='latitude',
            field=models.FloatField(default=None),
        ),
        migrations.AddField(
            model_name='location',
            name='location',
            field=models.CharField(default=None, max_length=255),
        ),
        migrations.AddField(
            model_name='location',
            name='longitude',
            field=models.FloatField(default=None),
        ),
        migrations.AlterField(
            model_name='favorite',
            name='property',
            field=models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.CASCADE, to='propriety.location'),
        ),
        migrations.AlterField(
            model_name='favorite',
            name='user',
            field=models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='location',
            name='address',
            field=models.CharField(default=None, max_length=255),
        ),
        migrations.AlterUniqueTogether(
            name='location',
            unique_together={('address', 'latitude', 'longitude')},
        ),
    ]
