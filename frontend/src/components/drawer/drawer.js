import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem
} from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const CustomDrawerContent = props => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const checkLoginStatus = async () => {
      // Check if the user is logged in
      //const token = await AsyncStorage.getItem('token')
      //setIsLoggedIn(token !== null)
    }
    checkLoginStatus()
  }, [])

  return (
    <DrawerContentScrollView {...props}>
      {isLoggedIn ? (
        <>
          <DrawerItemList {...props} />
          <DrawerItem label="Logout" />
        </>
      ) : (
        <DrawerItem
          label="Login"
          onPress={() => props.navigation.navigate('Login')}
        />
      )}
    </DrawerContentScrollView>
  )
}

export default CustomDrawerContent
