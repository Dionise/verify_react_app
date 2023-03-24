from django.db import models
from django.conf import settings


class Location(models.Model):
    address = models.CharField(max_length=255,default=None)
    latitude = models.FloatField(default=None)
    longitude = models.FloatField(default=None)
    details = models.JSONField(null=True,default=None)
    location = models.JSONField(max_length=255,default=None)
    place_id = models.CharField(max_length=255,default=None)

    class Meta:
        unique_together = ('address', 'latitude', 'longitude')

    def __str__(self):
        return self.address

class Favorite(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True, default=None)
    place = models.ForeignKey(Location, on_delete=models.CASCADE, null=True, default=None)
    is_favorite = models.BooleanField(default=False)  

    class Meta:
        unique_together = ('user', 'place')

    def __str__(self):
        return f"{self.user.username} - {self.place}"



class History(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True, default=None)
    place = models.ForeignKey(Location, on_delete=models.CASCADE, null=True, default=None)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'place')

    def __str__(self):
        return f"{self.user.username} - {self.place}"




class Note(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    location = models.ForeignKey(Location, on_delete=models.CASCADE)
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('user', 'location')

    def __str__(self):
        return f"Note by {self.user.username} at {self.location}"
