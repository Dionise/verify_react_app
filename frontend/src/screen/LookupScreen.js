import React, {useState} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import apiKey from './apiKey';

const LookupScreen = ({navigation}) => {
  const [addressInput, setAddressInput] = useState('');

  const handleLookup = async () => {
    if (addressInput) {
      navigation.navigate('Map', {address: addressInput});
    } else {
      alert('Please enter a valid address.');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Address:</Text>
      <GooglePlacesAutocomplete
        placeholder="Search for an address..."
        onPress={(data, details = null) => {
          setAddressInput(data.description);
        }}
        query={{
          key: apiKey,
          language: 'en',
          components: 'country:uk',
        }}
        styles={{
          textInputContainer: styles.input,
          textInput: styles.textInput,
        }}
      />
      <Button title="Lookup" onPress={handleLookup} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 10,
  },
  textInput: {
    fontSize: 16,
    padding: 0,
  },
});

export default LookupScreen;
