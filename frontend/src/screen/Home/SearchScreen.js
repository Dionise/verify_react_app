import React, {useRef, useState, useContext} from 'react';
import {View, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import apiKey from '../apiKey';
import {useDispatch, useSelector} from 'react-redux';
import {searchScreenStyles} from './style';
import {addpropriety} from '../../stores/propriety.reducer.js';
import AddressContext from '../../contexts/AddressContext.js';

const SearchScreen = () => {
  const {setAddressData} = useContext(AddressContext);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const googlePlacesRef = useRef(null);

  const isAuthenticated = useSelector(state => state.user.isAuthenticated);

  const fetchPlaceDetails = async place_id => {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&key=${apiKey}&fields=geometry`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data.result;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={searchScreenStyles.container}>
      {isAuthenticated == false ? (
        <View
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
          }}>
          <Button
            title="Login"
            onPress={() => navigation.navigate('Auth', {screen: 'Login'})}
          />
        </View>
      ) : null}

      <View style={searchScreenStyles.searchContainer}>
        <GooglePlacesAutocomplete
          ref={googlePlacesRef}
          placeholder="Search for an address..."
          onTextInputLayout={() => {
            googlePlacesRef.current?.setAddressText('default text');
          }}
          onPress={async data => {
            const details = await fetchPlaceDetails(data.place_id);

            if (details && details.geometry && details.geometry.location) {
              const location = {
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
              };

              setAddressData({
                address: data.description,
                details: details,
                location: location,
                place_id: data.place_id,
              });

              dispatch(
                addpropriety({
                  location: location,
                  latitude: location.latitude,
                  longitude: location.longitude,
                  address: data.description,
                  details: details,
                  place_id: data.place_id,
                }),
              )
                .then(response => {
                  if (response.meta.requestStatus === 'fulfilled') {
                    googlePlacesRef.current.setAddressText('');

                    navigation.navigate('PropertyDetails', {
                      screen: 'Home',
                      params: {
                        address: data.description,
                        details: details,
                        location: location,
                        place_id: data.place_id,
                      },
                    });
                  } else {
                    console.warn('Failed to save the location');
                  }
                })
                .catch(error => {
                  console.error(error);
                });
            } else {
              console.warn('Details or location not available');
            }
          }}
          query={{
            key: apiKey,
            y: 'en',
            components: 'country:uk',
          }}
          enablePoweredByContainer={false}
          textContentType="addressCityAndState"
        />
      </View>
      <View style={searchScreenStyles.ButtonContainer}>
        <View style={searchScreenStyles.favoriteButtonContainer}>
          <Button
            title="Favorite"
            onPress={() => navigation.navigate('FavoriteScreen')}
          />
        </View>
        <View style={searchScreenStyles.favoriteButtonContainer}>
          <Button
            title="History"
            onPress={() => navigation.navigate('HistoryScreen')}
          />
        </View>
      </View>
    </View>
  );
};

export default SearchScreen;
