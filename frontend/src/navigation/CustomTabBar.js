import React, {useContext} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import AddressContext from '../contexts/AddressContext';
const CustomTabBar = ({state, descriptors, navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.topSelectionContainer}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          return (
            <View
              key={`top-${route.key}`}
              style={[
                styles.topSelection,
                isFocused ? styles.activeTopSelection : null,
              ]}
            />
          );
        })}
      </View>
      <View style={styles.tabButtonsContainer}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : route.name;
          const {address, details, location, place_id, setAddressData} =
            useContext(AddressContext);
          useFocusEffect(
            React.useCallback(() => {
              setAddressData({
                address: address,
                details: details,
                location: location,
                place_id: place_id,
              });
              return () => {}; // Return a cleanup function
            }, [address, details, location, place_id]),
          );

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, {address, location, place_id});
            }
          };

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityStates={isFocused ? ['selected'] : []}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              style={[
                styles.tabButton,
                isFocused ? styles.selectedTabButton : null,
              ]}>
              <Text
                style={[
                  styles.tabLabel,
                  isFocused ? styles.selectedTabLabel : null,
                ]}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F5F5',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    shadowOpacity: 0.2,
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowRadius: 30,
  },
  topSelectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  topSelection: {
    width: '20%',
    height: 2,
    backgroundColor: 'transparent',
  },
  activeTopSelection: {
    backgroundColor: 'red',
  },
  tabButtonsContainer: {
    flexDirection: 'row',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  selectedTabButton: {},
  tabLabel: {
    fontSize: 12,
    color: 'gray',
  },
  selectedTabLabel: {
    color: 'black',
  },
});

export default CustomTabBar;
