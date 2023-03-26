import React, {useState, useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SearchScreen from '../screen/Home/SearchScreen.js';
import PropertyDetailsScreen from '../screen/Profile/PropertyDetailsScreen.js';
import GeneralViewScreen from '../screen/Note/GeneralViewScreen.js';
import {NavigationContainer} from '@react-navigation/native';
import {HeaderBackButton} from '@react-navigation/stack';
import SettingsScreen from '../screen/Settings/SettingsScreen.js';
import RegisterScreen from '../screen/Authentification/Register/RegisterScreen.js';
import LoginScreen from '../screen/Authentification/Login/LoginScreen.js';
import ResetScreen from '../screen/Authentification/Reset/ResetScreen.js';
import SplashScreen from '../screen/SplashScreen/SplashScreen.js';
import FavoriteScreen from '../screen/Favorite/FavoriteScreen.js';
import AccountAccessScreen from '../screen/AccountAccess/AccountAccessScreen.js';
import AccountPreferenceScreen from '../screen/AccountPreference/AccountPreferenceScreen.js';
import CheckListScreen from '../screen/Note/CheckList/CheckListScreen.js';
import {Button, Text, View} from 'react-native';
import FullScreenMapScreen from '../screen/Helpscreen/FullScreenMapScreen.js';
import AddNote from '../screen/Note/AddNote/AddNoteScreen.js';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {selectAuthState} from '../stores/user.reducer.js';
import CustomDrawerContent from '../components/drawer/drawer.js';
import {useWindowDimensions} from 'react-native';
import {navigationStyles} from './style';

import {useSelector} from 'react-redux';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={({navigation}) => ({
          headerTitle: 'Register',
          headerLeft: () => (
            <Button
              title="Back"
              onPress={() => navigation.navigate('Search')}
            />
          ),
        })}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={({navigation}) => ({
          headerTitle: 'Login',
          headerLeft: () => (
            <Button
              title="Back"
              onPress={() => navigation.navigate('Search')}
            />
          ),
        })}
      />
      <Stack.Screen
        name="Reset"
        component={ResetScreen}
        options={({navigation}) => ({
          headerTitle: 'Login',
          headerLeft: () => (
            <Button
              title="Back"
              onPress={() => navigation.navigate('Search')}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
};

const PropertyDetailsTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Notes"
        component={GeneralViewScreen}
        options={{
          headerShown: false,
          headerLeft: props => (
            <HeaderBackButton
              {...props}
              onPress={() => props.navigation.navigate('Search')}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={PropertyDetailsScreen}
        options={{
          headerShown: false,
          headerLeft: props => (
            <HeaderBackButton
              {...props}
              onPress={() => props.navigation.navigate('Search')}
            />
          ),
        }}
      />
      <Tab.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{
          title: 'Settings',
          headerShown: false,
          headerLeft: props => (
            <HeaderBackButton
              {...props}
              onPress={() => props.navigation.navigate('Search')}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const SearchScreenDrawer = () => {
  const authState = useSelector(selectAuthState);
  const [isSignedIn, setIsSignedIn] = useState(authState);
  const dimensions = useWindowDimensions();
  const drawerWidth = dimensions.width * 0.3;

  useEffect(() => {
    setIsSignedIn(authState);
  }, [authState]);

  if (isSignedIn) {
    return (
      <Drawer.Navigator
        drawerStyle={[navigationStyles.drawer, {width: drawerWidth}]}
        drawerContent={props => <CustomDrawerContent {...props} />}>
        <Drawer.Screen name="SearchScreen" component={SearchScreen} />
      </Drawer.Navigator>
    );
  } else {
    return <SearchScreen />;
  }
};
//NoteScreenOptionScreen
const MainNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen
          name="FullScreenMapScreen"
          component={FullScreenMapScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AccountAccessScreen"
          component={AccountAccessScreen}
          options={{title: ''}}
        />
        <Stack.Screen
          name="AccountPreferenceScreen"
          component={AccountPreferenceScreen}
          options={{title: ''}}
        />

        <Stack.Screen
          name="CheckListScreen"
          component={CheckListScreen}
          options={{title: '', headerShown: false}}
        />

        <Stack.Screen
          name="AddNote"
          component={AddNote}
          options={{title: '', headerShown: false}}
        />

        <Stack.Screen
          name="FavoriteScreen"
          component={FavoriteScreen}
          options={({navigation}) => ({
            headerLeft: () => (
              <Button
                title="Back"
                onPress={() => navigation.navigate('Search')}
              />
            ),
            headerTitle: 'Favorites',
          })}
        />
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Auth"
          component={AuthStack}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Search"
          component={SearchScreenDrawer}
          options={{headerShown: false, tabBarVisible: false}}
        />
        <Stack.Screen
          name="PropertyDetails"
          component={PropertyDetailsTabs}
          options={({navigation}) => ({
            headerShown: false,
            headerLeft: () => (
              <Button
                title="Back"
                onPress={() => navigation.navigate('Search')}
              />
            ),
            headerRight: () => (
              <View>
                <Text onPress={() => console.log('ok')}>s</Text>
              </View>
            ),
            headerTitle: ' ',
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;
