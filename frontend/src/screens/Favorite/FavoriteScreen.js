import React from 'react'
import { View, Text } from 'react-native'
import { useSelector } from 'react-redux'

const FavoriteScreen = () => {
  const favorites = useSelector(state => state.favorites)

  return (
    <View>
      <Text>Favorite Screen</Text>
    </View>
  )
}

export default FavoriteScreen
