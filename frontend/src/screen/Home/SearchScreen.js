import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import apiKey from '../apiKey';

import {searchScreenStyles} from './style';

const SearchScreen = () => {
  const [addressInput, setAddressInput] = useState('');
  const navigation = useNavigation();

  const handleLookup = async () => {
    if (addressInput) {
      navigation.navigate('PropertyDetails', {
        screen: 'Property Details',
        params: {address: addressInput},
      });
    } else {
      alert('Please enter a valid address.');
    }
  };

  return (
    <View style={searchScreenStyles.container}>
      <View style={searchScreenStyles.searchContainer}>
        <GooglePlacesAutocomplete
          placeholder="Search for an address..."
          onPress={(data, details = null) => {
            navigation.navigate('PropertyDetails', {
              screen: 'Property Details',
              params: {address: data.description},
            });
          }}
          query={{
            key: apiKey,
            language: 'en',
            components: 'country:uk',
          }}
          styles={{
            textInputContainer: searchScreenStyles.textInputContainer,
            textInput: searchScreenStyles.textInput,
            listView: searchScreenStyles.listView,
          }}
          enablePoweredByContainer={false}
        />
      </View>
    </View>
  );
};

export default SearchScreen;
