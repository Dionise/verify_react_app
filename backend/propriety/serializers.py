from rest_framework import serializers
from .models import Location, Favorite,Note,History 

class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = '__all__'

class FavoriteSerializer(serializers.ModelSerializer):
    place = LocationSerializer()

    class Meta:
        model = Favorite
        fields = '__all__'

class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ('id', 'user', 'location', 'text', 'created_at', 'updated_at')

class HistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = History 
        fields = '__all__'




 