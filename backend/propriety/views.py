from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Location
from .serializers import LocationSerializer
from django.db.models import Q
from rest_framework import permissions, status
from django.http import JsonResponse
import requests
from django.db import IntegrityError
from rest_framework import generics
from rest_framework import mixins
from .models import Note, History
from .serializers import NoteSerializer, HistorySerializer



from .models import Favorite
from .serializers import FavoriteSerializer
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated

def get_crime_data(lat, lng, date):
    url = f"https://data.police.uk/api/crimes-no-location?category=all-crime&force=leicestershire&date=2017-03"

    response = requests.get(url)    
    if response.status_code == 200:
        return response.json()
    else:
        return None

class LocationCreateView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        serializer = LocationSerializer(data=request.data)

        if serializer.is_valid():
            try:
                location = serializer.save()

                # Call the police API to get crime data for this location
                crimes = get_crime_data(location.latitude, location.longitude, "2017-01")
                if crimes:
                    # Process the crime data here and save to the database
                     pass

                # Retrieve the Favorite instance associated with the user and location
                favorite = Favorite.objects.get(user=request.user, place=location)
                
                is_favorite = favorite.is_favorite
               

                # Return a success response with the is_favorite value
                return Response( is_favorite, status=status.HTTP_201_CREATED)
            except IntegrityError:
                # Handle the case where the Location instance already exists
                pass
            except Favorite.DoesNotExist:
                # Handle the case where the Favorite instance does not exist
                pass

        # Return a success response with empty data
        return Response({}, status=status.HTTP_200_OK)

class SearchAddressView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        query = request.GET.get('query')

        # Check if the query is not empty
        if not query:
            return JsonResponse([], safe=False, status=status.HTTP_200_OK)

        addresses = Location.objects.filter(
            Q(address__icontains=query) 
        ).select_related()

        serializer = LocationSerializer(addresses, many=True)

        return JsonResponse(serializer.data, safe=False, status=status.HTTP_200_OK)

class FavoriteToggleView(mixins.UpdateModelMixin, generics.GenericAPIView):
    queryset = Favorite.objects.all()
    serializer_class = FavoriteSerializer

    def get_object(self):
        user = self.request.user
        place_id = self.kwargs['place_id']
        location = get_object_or_404(Location, place_id=place_id)
        favorite, created = Favorite.objects.get_or_create(user=user, place=location)
        return favorite

    def patch(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)

    def perform_update(self, serializer):
        is_favorite = self.request.data.get('is_favorite', None)
        if is_favorite is not None:
            serializer.save(is_favorite=is_favorite)

class FavoriteListView(generics.ListAPIView):
    serializer_class = FavoriteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Favorite.objects.filter(user=user, is_favorite=True)

class DeleteFavoriteView(APIView):
    def delete(self, request, favorite_id):
        try:
            favorite = Favorite.objects.get(id=favorite_id)
            favorite.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Favorite.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

class NoteListCreateAPIView(generics.ListCreateAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Note.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class HistoryListAPIView(generics.ListCreateAPIView):
    serializer_class = HistorySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        
        user = self.request.user
        return History.objects.filter(user=user)

class HistoryRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset =  History.objects.all()
    serializer_class =  HistorySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return  History.objects.filter(user=self.request.user)
        
class NoteRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Note.objects.filter(user=self.request.user)