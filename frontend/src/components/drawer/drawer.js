import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem
} from '@react-navigation/drawer'
import { useSelector } from 'react-redux'

import { useDispatch } from 'react-redux'
import { logout } from '../../stores/user.reducer.js'

const CustomDrawerContent = props => {
  const authState = useSelector(state => state.user.auth)
  const dispatch = useDispatch()

  const handleLogout = async () => {
    try {
      await dispatch(logout())
    } catch (error) {
      console.log('Logout failed:', error)
    }
  }

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.userInfo}>
        <Text style={styles.userName}>
          {authState.user.first_name} {authState.user.last_name}
        </Text>
        <Text style={styles.userEmail}>{authState.user.email}</Text>
      </View>

      <DrawerItem label="Logout" onPress={handleLogout} />
    </DrawerContentScrollView>
  )
}

const styles = StyleSheet.create({
  userInfo: {
    padding: 20
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5
  },
  userEmail: {
    fontSize: 14,
    color: 'gray'
  }
})

export default CustomDrawerContent
