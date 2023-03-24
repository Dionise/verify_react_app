from django.urls import path
from .views import HistoryRetrieveUpdateDestroyAPIView, HistoryListAPIView, LocationCreateView,SearchAddressView,FavoriteToggleView,FavoriteListView,DeleteFavoriteView,NoteListCreateAPIView, NoteRetrieveUpdateDestroyAPIView


urlpatterns = [
   path('save-location', LocationCreateView.as_view(), name='create_location'),
   path('search-address', SearchAddressView.as_view(), name='search_address'),
   path('toggle-favorite/<str:place_id>/', FavoriteToggleView.as_view(), name='favorite-toggle'),
   path('favorites/', FavoriteListView.as_view(), name='favorites'),
   path('deletefavorite/<int:favorite_id>/',  DeleteFavoriteView.as_view(), name='delete_favorite'),
   path('notes/', NoteListCreateAPIView.as_view(), name='note-list'),
   path('history/', HistoryListAPIView.as_view(), name='history-list'),
   path('note/<int:pk>/', NoteRetrieveUpdateDestroyAPIView.as_view(), name='note-detail'),
   #path('history/<int:pk>/', HistoryRetrieveUpdateDestroyAPIView.as_view(), name='history-detail'),
     
]
