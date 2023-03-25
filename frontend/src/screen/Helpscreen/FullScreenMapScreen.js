import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Image} from 'react-native';
import MapView, {Marker} from 'react-native-maps';

const FullScreenMapScreen = ({navigation, route}) => {
  const {location} = route.params;

  const [mapType, setMapType] = useState('standard');

  const [currentLocation, setCurrentLocation] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.09,
    longitudeDelta: 0.09,
  });

  useEffect(() => {
    setCurrentLocation({
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: 0.09,
      longitudeDelta: 0.09,
    });
  }, [location]);

  const changeMapType = () => {
    switch (mapType) {
      case 'standard':
        setMapType('satellite');
        break;
      case 'satellite':
        setMapType('hybrid');
        break;
      default:
        setMapType('standard');
        break;
    }
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={currentLocation} mapType={mapType}>
        <Marker coordinate={currentLocation}>
          <Image
            source={require('../../assets/images/marker.jpg')}
            style={{height: 45, width: 35}}
          />
        </Marker>
      </MapView>
      <TouchableOpacity
        style={styles.goBackButton}
        onPress={() => navigation.goBack()}>
        <Text>Go Back</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.mapTypeButton} onPress={changeMapType}>
        <Text>Change Map Type</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  goBackButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 8,
  },
  mapTypeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 8,
  },
});

export default FullScreenMapScreen;
