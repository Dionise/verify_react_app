import React, { useState, useEffect } from 'react'
import { View, TextInput, TouchableOpacity, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/FontAwesome'

import { useDispatch, useSelector } from 'react-redux'
import { fetchUser, selectUser } from '../../stores/user.reducer'

import { searchScreenStyles } from './style'

const SearchScreen = () => {
  const [address, setAddress] = useState('')
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  console.log(user)

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

  const handleLogin = () => {
    navigation.navigate('Auth', { screen: 'Login' })
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

      <TouchableOpacity
        style={searchScreenStyles.loginIcon}
        onPress={handleLogin}>
        <Icon name="user" size={24} color="black" />
      </TouchableOpacity>
    </View>
  )
}

export default SearchScreen

{
  /* const handleSearch = async () => {
  try {
    // Make API request to verify address
    const response = await fetch(
      `https://api.example.com/verify-address?address=${address}`
    )
    const data = await response.json()

    // If address is valid, send it to Django REST Framework API
    if (data.isValid) {
      const drfResponse = await fetch(
        'https://your-drf-api.com/process-address',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ address })
        }
      )
      const drfData = await drfResponse.json()

      // Navigate to PropertyDetailsScreen with property details
      navigation.navigate('PropertyDetails', {
        propertyDetails: drfData
      })
    } else {
      console.log('Address is invalid')
    }
  } catch (error) {
    console.error(error)
  }
}s */
}
