import React, {useState, useEffect} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import apiKey from '../apiKey';

import {propertyDetailsStyles} from './propertyDetailsStyles';

const PropertyDetailsScreen = ({route}) => {
  console.log('PropertyDetailsScreen route params:', route.params);

  const {address} = route.params;

  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  });

  const geocodeAddress = async address => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address,
    )}&key=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const lookupAddress = async () => {
      const results = await geocodeAddress(address);
      if (results.length > 0) {
        const {location} = results[0].geometry;
        const {lat: latitude, lng: longitude} = location;
        setLocation({
          latitude,
          longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        });
      }
    };

    lookupAddress();
  }, [address]);

  return (
    <View style={propertyDetailsStyles.container}>
      <MapView style={propertyDetailsStyles.map} region={location}>
        <Marker coordinate={location} />
      </MapView>
      {/* Other components for displaying property details */}
    </View>
  );
};

export default PropertyDetailsScreen;
