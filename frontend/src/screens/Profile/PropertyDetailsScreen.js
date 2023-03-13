import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { propertyDetailsStyles } from './propertyDetailsStyles'

const PropertyDetailsScreen = ({ route }) => {
  const propertyDetails = route.params?.propertyDetails

  const placeholderImage = 'https://via.placeholder.com/150'

  return (
    <View style={propertyDetailsStyles.container}>
      <View style={propertyDetailsStyles.imageContainer}>
        <Image
          source={{ uri: propertyDetails?.image || placeholderImage }}
          style={propertyDetailsStyles.image}
        />
      </View>
      <Text style={propertyDetailsStyles.title}>propertyDetails.title</Text>
      <Text style={propertyDetailsStyles.subtitle}>adrees</Text>
      <Text style={propertyDetailsStyles.text}>propertyDetails.price</Text>
      <Text style={propertyDetailsStyles.description}>
        propertyDetails.description
      </Text>
    </View>
  )
}

export default PropertyDetailsScreen
