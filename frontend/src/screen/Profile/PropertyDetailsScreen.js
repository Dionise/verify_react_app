import React, {useState, useEffect} from 'react';
import {TextInput, StyleSheet, Image} from 'react-native';
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

import {toggleFavoriteProperty} from '../../stores/propriety.reducer';
import CustomHeaderHome from 'src/components/CustomHeader/CustomHeaderHome';
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
      latitudeDelta: 0.002,
      longitudeDelta: 0.002,
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

  {
  }

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
    <>
      <CustomHeaderHome
        navigation={navigation}
        onFavoriteToggle={toggleFavorite}
        isFavorite={isFavorite}
      />
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.mapContainer}>
            <MapView
              scrollEnabled={false}
              zoomEnabled={false}
              style={styles.map}
              region={currentLocation}>
              <Marker coordinate={currentLocation}>
                <Image
                  source={require('../../assets/images/marker.jpg')}
                  style={{height: 45, width: 35}}
                />
              </Marker>
            </MapView>
            <TouchableOpacity
              style={styles.mapExpandButton}
              onPress={toggleMapSize}>
              <Text style={styles.mapExpandButtonText}>
                {isMapMaximized ? 'Minimize Map' : 'Maximize Map'}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.descriptionContainer}>
            <Text style={styles.description}>Property Information:</Text>
            <Text style={styles.text}>
              <Text style={{fontWeight: 'bold'}}>Address</Text>: {address}
            </Text>
            <Text style={styles.text}>
              <Text style={{fontWeight: 'bold'}}>City</Text>: Bolton, UK
            </Text>
            <Text style={styles.text}>
              <Text style={{fontWeight: 'bold'}}>Legal</Text>: Freehold
            </Text>
            <Text style={styles.text}>
              <Text style={{fontWeight: 'bold'}}>Type</Text>: Terraced
            </Text>
            <Text style={styles.text}>
              <Text style={{fontWeight: 'bold'}}>Rooms</Text>: 3
            </Text>
            <Text style={styles.text}>
              <Text style={{fontWeight: 'bold'}}>Size</Text>: 89 m2 (59 ft2)
            </Text>
          </View>
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
          <View style={styles.rentmortgage}>
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
            <TextInput
              value={term}
              onChangeText={setTerm}
              keyboardType="numeric"
              style={{
                borderWidth: 1,
                borderColor: 'gray',
                padding: 5,
              }}
            />

            {isMortgageCalculator ? (
              <Text style={styles.resultText}>
                Mortgage: £
                <Text style={styles.resultNumber}>{resultMortgage}</Text> per
                month
              </Text>
            ) : (
              <Text style={styles.resultText}>
                Rent: £<Text style={styles.resultNumber}>{resultRent}</Text> per
                year
              </Text>
            )}
          </View>
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  resultText: {
    textAlign: 'center',
    paddingBottom: 20,
    paddingTop: 20,
  },
  resultNumber: {
    fontWeight: 'bold',
    fontSize: 18,
  },
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

  container: {backgroundColor: 'white', paddingBottom: '25%'},

  addressButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  addressBox: {
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    maxWidth: 300,
  },
  addressText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  favoriteButton: {
    backgroundColor: '#007AFF',
    borderRadius: 5,
    padding: 10,
    minWidth: 100,
    alignItems: 'center',
    position: 'absolute',
    right: 0,
    marginLeft: 0,
  },
  favoriteButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

  description: {
    fontSize: 22,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 14,
    marginBottom: 5,
  },
  mapContainer: {
    flex: 1,
    height: 200,
    borderRadius: 10,
  },

  descriptionContainer: {
    flex: 1,
    marginTop: 20,
    borderRadius: 10,
    overflow: 'hidden',
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
  },
  rentmortgage: {
    backgroundColor: '#F5F5F5',
    alignSelf: 'stretch',
    paddingHorizontal: 10,
    paddingTop: 10,
  },

  map: {
    flex: 1,
  },
  mapExpandButton: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 5,
    alignSelf: 'flex-end',
    marginTop: -40,
    marginRight: 10,
  },
  mapExpandButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  additionalInfo: {
    marginTop: 10,
    marginBottom: 10,
  },

  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    marginBottom: 10,
  },
});

export default PropertyDetailsScreen;
