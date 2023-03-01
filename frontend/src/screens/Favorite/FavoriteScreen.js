import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Alert
} from 'react-native'
import { useSelector } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome'

const dummyFavorites = [
  { id: 1, image: null, address: '123 Main St' },
  { id: 2, image: null, address: '456 Oak Ave' },
  { id: 3, image: null, address: '789 Maple Ln' }
]

const FavoriteScreen = () => {
  const [favorites, setFavorites] = useState(dummyFavorites)

  const handleDeleteFavorite = id => {
    Alert.alert(
      'Delete Favorite',
      'Are you sure you want to delete this favorite?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            const updatedFavorites = favorites.filter(
              favorite => favorite.id !== id
            )
            setFavorites(updatedFavorites)
          }
        }
      ],
      { cancelable: true }
    )
  }

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.cardContainer}>
        <View style={styles.cardImageContainer}>
          {item.image ? (
            <Image source={{ uri: item.image }} style={styles.cardImage} />
          ) : (
            <View style={styles.blankImage} />
          )}
        </View>
        <View style={styles.cardDetailsContainer}>
          <Text style={styles.cardAddress}>{item.address}</Text>
        </View>
        <TouchableOpacity
          style={styles.cardDeleteButton}
          onPress={() => handleDeleteFavorite(item.id)}>
          <Icon name="trash-o" size={24} color="red" />
        </TouchableOpacity>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20
  },
  cardContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 10,
    padding: 10
  },
  cardImageContainer: {
    width: 80,
    height: 80,
    marginRight: 10
  },
  cardImage: {
    width: '100%',
    height: '100%',
    borderRadius: 40
  },
  blankImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#ccc',
    borderRadius: 40
  },
  cardDetailsContainer: {
    flex: 1
  },
  cardAddress: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5
  },
  cardFavorite: {
    fontSize: 14,
    color: 'gray',
    textTransform: 'uppercase'
  },
  cardDeleteButton: {
    marginLeft: 'auto'
  }
})

export default FavoriteScreen
