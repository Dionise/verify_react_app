import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {getFavorites, deleteFavoriteById} from '../../stores/propriety.reducer';
import {useDispatch, useSelector} from 'react-redux';

const HistoryScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.propriety.favorites);

  useEffect(() => {
    dispatch(getFavorites());
  }, [dispatch]);

  const handleDeleteFavorite = id => {
    Alert.alert(
      'Delete Favorite',
      'Are you sure you want to delete this favorite?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            dispatch(deleteFavoriteById(id));
          },
        },
      ],
      {cancelable: true},
    );
  };

  const HandleDetailPreviw = item => {
    navigation.navigate('PropertyDetails', {
      screen: 'Property Details',
      params: {
        address: item.place.address,
        details: item.place.details,
        location: item.place.location,
        place_id: item.place.place_id,
      },
    });
  };

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => HandleDetailPreviw(item)}
        style={styles.cardContainer}>
        <View style={styles.cardImageContainer}>
          {item.place.details.image ? (
            <Image
              source={{uri: item.place.details.image}}
              style={styles.cardImage}
            />
          ) : (
            <View style={styles.blankImage} />
          )}
        </View>
        <View style={styles.cardDetailsContainer}>
          <Text style={styles.cardAddress}>{item.place.address}</Text>
        </View>
        <TouchableOpacity
          style={styles.cardDeleteButton}
          onPress={() => handleDeleteFavorite(item.id)}>
          <Text>Delete</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  cardContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
  },
  cardImageContainer: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  cardImage: {
    width: '100%',
    height: '100%',
    borderRadius: 40,
  },
  blankImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#ccc',
    borderRadius: 40,
  },
  cardDetailsContainer: {
    flex: 1,
  },
  cardAddress: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardFavorite: {
    fontSize: 14,
    color: 'gray',
    textTransform: 'uppercase',
  },
  cardDeleteButton: {
    marginLeft: 'auto',
  },
});

export default HistoryScreen;
