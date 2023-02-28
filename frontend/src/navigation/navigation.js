import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import SearchScreen from '../screens/Home/SearchScreen.js'
import PropertyDetailsScreen from '../screens/Profile/PropertyDetailsScreen.js'
import NotesScreen from '../screens/Note/NotesScreen.js'
import DocumentsScreen from '../screens/Documents/DocumentsScreen.js'
import { NavigationContainer } from '@react-navigation/native'
import { HeaderBackButton } from '@react-navigation/stack'
import RegisterScreen from '../screens/Authentification/Register/RegisterScreen.js'
import LoginScreen from '../screens/Authentification/Login/LoginScreen.js'
import ResetScreen from '../screens/Authentification/Reset/ResetScreen.js'
import SplashScreen from '../screens/SplashScreen/SplashScreen.js'
import FavoriteScreen from '../screens/Favorite/FavoriteScreen.js'
import { Button } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { selectAuthState } from '../stores/user.reducer.js'
import CustomDrawerContent from '../components/drawer/drawer.js'
import { useWindowDimensions } from 'react-native'
import { navigationStyles } from './style'
const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()
const Drawer = createDrawerNavigator()

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={({ navigation }) => ({
          headerTitle: 'Register',
          headerLeft: () => (
            <Button
              title="Back"
              onPress={() => navigation.navigate('Search')}
            />
          )
        })}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={({ navigation }) => ({
          headerTitle: 'Login',
          headerLeft: () => (
            <Button
              title="Back"
              onPress={() => navigation.navigate('Search')}
            />
          )
        })}
      />
      <Stack.Screen
        name="Reset"
        component={ResetScreen}
        options={({ navigation }) => ({
          headerTitle: 'Login',
          headerLeft: () => (
            <Button
              title="Back"
              onPress={() => navigation.navigate('Search')}
            />
          )
        })}
      />
    </Stack.Navigator>
  )
}

const PropertyDetailsTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Property Details"
        component={PropertyDetailsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" size={size} color={color} />
          ),
          headerShown: false,
          headerLeft: props => (
            <HeaderBackButton
              {...props}
              onPress={() => props.navigation.navigate('Search')}
            />
          )
        }}
      />
      <Tab.Screen
        name="Notes"
        component={NotesScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="sticky-note-o" size={size} color={color} />
          ),
          headerShown: false,
          headerLeft: props => (
            <HeaderBackButton
              {...props}
              onPress={() => props.navigation.navigate('Search')}
            />
          )
        }}
      />
      <Tab.Screen
        name="Documents"
        component={DocumentsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="file-o" size={size} color={color} />
          ),
          headerShown: false,
          headerLeft: props => (
            <HeaderBackButton
              {...props}
              onPress={() => props.navigation.navigate('Search')}
            />
          )
        }}
      />
    </Tab.Navigator>
  )
}

const SearchScreenDrawer = () => {
  const authState = useSelector(selectAuthState)
  const [isSignedIn, setIsSignedIn] = useState(authState)
  const dimensions = useWindowDimensions()
  const drawerWidth = dimensions.width * 0.3

  useEffect(() => {
    setIsSignedIn(authState)
  }, [authState])

  if (isSignedIn) {
    return (
      <Drawer.Navigator
        drawerStyle={[navigationStyles.drawer, { width: drawerWidth }]}
        drawerContent={props => <CustomDrawerContent {...props} />}>
        <Drawer.Screen name="SearchScreen" component={SearchScreen} />
      </Drawer.Navigator>
    )
  } else {
    return <SearchScreen />
  }
}

const MainNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen
          name="FavoriteScreen"
          component={FavoriteScreen}
          options={({ navigation }) => ({
            headerLeft: () => (
              <Button
                title="Back"
                onPress={() => navigation.navigate('Search')}
              />
            ),
            headerTitle: 'Favorites'
          })}
        />
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Auth"
          component={AuthStack}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Search"
          component={SearchScreenDrawer}
          options={{ headerShown: false, tabBarVisible: false }}
        />
        <Stack.Screen name="PropertyDetails" component={PropertyDetailsTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default MainNavigation
