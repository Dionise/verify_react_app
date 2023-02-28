import React, { useState, useEffect } from 'react'
import { View, TextInput, TouchableOpacity, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/FontAwesome'

import { useDispatch, useSelector } from 'react-redux'
import {
  fetchUser,
  selectUser,
  selectAuthState
} from '../../stores/user.reducer'

import { searchScreenStyles } from './style'

const SearchScreen = () => {
  const [address, setAddress] = useState('')
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  const isAuthenticated = useSelector(selectAuthState)

  useEffect(() => {
    dispatch(fetchUser())
  }, [dispatch])

  const handleSearch = () => {
    // Make API request to find property details based on address
    // ...

    // Navigate to PropertyDetailsScreen with property details
    navigation.navigate('PropertyDetails', {
      propertyDetails: {
        /* object properties */
      }
    })
  }

  const handleFavorite = () => {
    navigation.navigate('FavoriteScreen')
  }

  return (
    <View style={searchScreenStyles.container}>
      <View style={searchScreenStyles.searchContainer}>
        <TextInput
          style={searchScreenStyles.input}
          placeholder="Enter address"
          value={address}
          onChangeText={setAddress}
        />
        <TouchableOpacity onPress={handleSearch}>
          <Icon name="search" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[
          searchScreenStyles.favoriteIcon,
          { position: 'absolute', bottom: 40, alignItems: 'center' }
        ]}
        onPress={handleFavorite}>
        <Icon name="star" size={35} color="black" />
        <Text style={searchScreenStyles.favoriteText}>Favorite</Text>
      </TouchableOpacity>

      {isAuthenticated ? null : (
        <TouchableOpacity
          style={searchScreenStyles.loginIcon}
          onPress={() => navigation.navigate('Auth', { screen: 'Login' })}>
          <Icon name="user" size={24} color="black" />
        </TouchableOpacity>
      )}
    </View>
  )
}

export default SearchScreen
