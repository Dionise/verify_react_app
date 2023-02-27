import React from 'react'
import { View, Text } from 'react-native'

const PropertyDetailsScreen = ({ route }) => {
  const propertyDetails = route.params?.propertyDetails

  return (
    <View>
      {propertyDetails && (
        <>
          <Text>{propertyDetails.address}</Text>
          <Text>{propertyDetails.price}</Text>
          <Text>{propertyDetails.bedrooms}</Text>
          <Text>{propertyDetails.bathrooms}</Text>
          <Text>{propertyDetails.sqft}</Text>
          <Text>{propertyDetails.description}</Text>
        </>
      )}

      {/* Add other property details as needed */}
    </View>
  )
}

export default PropertyDetailsScreen
