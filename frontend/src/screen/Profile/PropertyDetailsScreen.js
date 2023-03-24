import React, {useState, useEffect} from 'react';
import {TextInput, Button, Switch, StyleSheet} from 'react-native';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {useDispatch, useSelector} from 'react-redux';
import {propertyDetailsStyles} from './propertyDetailsStyles';
import {toggleFavoriteProperty} from '../../stores/propriety.reducer';

const PropertyDetailsScreen = ({route, navigation}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const dispatch = useDispatch();

  const is_favorite = useSelector(state => state.propriety.is_favorite);

  console.log({is_favorite});
  const {address, location, place_id} = route.params;

  const [currentLocation, setCurrentLocation] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  });

  const [isMapMaximized, setIsMapMaximized] = useState(false);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'ios') {
        Geolocation.requestAuthorization();

        return;
      }

      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'This app needs location access to show directions.',
          buttonPositive: 'OK',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          position => {
            const {latitude, longitude} = position.coords;
            setUserLocation({latitude, longitude});
          },
          error => console.log(error),
          {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
        );
      }
    };

    requestLocationPermission();
  }, []);

  const toggleMapSize = () => {
    navigation.navigate('FullScreenMapScreen', {location});
  };

  useEffect(() => {
    setCurrentLocation({
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    });
  }, [location]);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    dispatch(
      toggleFavoriteProperty({
        place_id: place_id,
        is_favorite: !isFavorite,
      }),
    );
  };

  const [isMortgageCalculator, setIsMortgageCalculator] = useState(true);
  const [calculatorType, setCalculatorType] = useState('Mortgage');
  const [price, setPrice] = useState('1000');
  const [deposit, setDeposit] = useState('100');
  const [term, setTerm] = useState('1');
  const [interestRate, setInterestRate] = useState('5.5');
  const [resultMortgage, setResultMortgage] = useState(null);
  const [resultRent, setResultRent] = useState(null);

  useEffect(() => {
    calculateResult();
  }, [price, deposit, term, interestRate]);

  const calculateResult = () => {
    // Mortgage calculator logic
    const principal = price - deposit;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = term * 12;

    const mortgageResult =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    setResultMortgage(mortgageResult.toFixed(2));

    // Rent calculator logic
    const rentResult = ((price - deposit) * term * 12) / term;
    setResultRent(rentResult.toFixed(2));
  };

  return (
    <View style={propertyDetailsStyles.container}>
      <View style={propertyDetailsStyles.addressButtonContainer}>
        <TouchableOpacity
          onPress={toggleFavorite}
          style={propertyDetailsStyles.favoriteButton}>
          <Text style={propertyDetailsStyles.favoriteButtonText}>
            {isFavorite ? 'Unfavorite' : 'Favorite'}
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={propertyDetailsStyles.mapContainer}>
          <MapView
            scrollEnabled={false}
            zoomEnabled={false}
            style={propertyDetailsStyles.map}
            region={currentLocation}>
            <Marker coordinate={currentLocation} />
          </MapView>
          <TouchableOpacity
            style={propertyDetailsStyles.mapExpandButton}
            onPress={toggleMapSize}>
            <Text style={propertyDetailsStyles.mapExpandButtonText}>
              {isMapMaximized ? 'Minimize Map' : 'Maximize Map'}
            </Text>
          </TouchableOpacity>
        </View>

        <View>
          <Text style={propertyDetailsStyles.description}>
            Property Information:
          </Text>
          <Text>Address: {address}</Text>
          <Text>City: Bolton, UK</Text>
          <Text>Legal: Freehold</Text>
          <Text>Type: Terraced</Text>
          <Text>Rooms: 3</Text>
          <Text>Size: 89 m2 (59 ft2)</Text>
        </View>

        <View>
          <View style={styles.tabs}>
            <TouchableOpacity
              style={[styles.tab, isMortgageCalculator ? styles.activeTab : {}]}
              onPress={() => setIsMortgageCalculator(true)}>
              <Text style={styles.tabText}>Mortgage</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tab,
                !isMortgageCalculator ? styles.activeTab : {},
              ]}
              onPress={() => setIsMortgageCalculator(false)}>
              <Text style={styles.tabText}>Rent</Text>
            </TouchableOpacity>
          </View>
          <Text>{calculatorType} Calculator:</Text>

          <Text>Price:</Text>
          <TextInput
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
            style={{borderWidth: 1, borderColor: 'gray', padding: 5}}
          />
          <Text>Deposit (10%):</Text>
          <TextInput
            value={deposit}
            onChangeText={setDeposit}
            keyboardType="numeric"
            style={{borderWidth: 1, borderColor: 'gray', padding: 5}}
          />
          <Text>Repayment term:</Text>

          {isMortgageCalculator && (
            <>
              <Text>Interest Rate:</Text>
              <TextInput
                value={interestRate}
                onChangeText={setInterestRate}
                keyboardType="numeric"
                style={{borderWidth: 1, borderColor: 'gray', padding: 5}}
              />
            </>
          )}
          <Text>Result:</Text>
          {isMortgageCalculator ? (
            <Text>Mortgage: £{resultMortgage} per month</Text>
          ) : (
            <Text>Rent: £{resultRent} per year</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  tabs: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f1f1f1',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    backgroundColor: '#ffffff',
    borderBottomColor: 'blue',
  },
  tabText: {
    fontWeight: 'bold',
  },
});

export default PropertyDetailsScreen;
