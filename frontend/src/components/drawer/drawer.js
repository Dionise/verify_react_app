import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, SafeAreaView } from 'react-native'
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem
} from '@react-navigation/drawer'
import { useSelector } from 'react-redux'

import { useDispatch } from 'react-redux'
import { logout } from '../../stores/user.reducer.js'

const avatarIcon =
  'https://e7.pngegg.com/pngimages/778/849/png-clipart-computer-icons-user-login-avatar-small-icons-angle-heroes.png'

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
    <SafeAreaView style={styles.container}>
      <DrawerContentScrollView {...props}>
        <View style={styles.userInfo}>
          <Image source={avatarIcon} style={styles.avatar} />
          <View style={styles.nameContainer}>
            <Text style={styles.userName}>
              {authState.user?.first_name || 'First Name'}
            </Text>
            <View style={styles.nameSeparator} />
            <Text style={styles.userName}>
              {authState.user?.last_name || 'Last Name'}
            </Text>
          </View>
          <Text style={styles.userEmail}>
            {authState.user?.email || 'Email'}
          </Text>
        </View>

        <DrawerItem label="Logout" onPress={handleLogout} />
      </DrawerContentScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  drawer: {
    backgroundColor: '#fff',
    paddingTop: 20
  },
  userInfo: {
    alignItems: 'center',
    marginBottom: 30
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10
  },
  nameContainer: {
    flexDirection: 'row'
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 5
  },
  nameSeparator: {
    width: 2,
    height: '100%',
    backgroundColor: 'gray',
    marginHorizontal: 5
  },
  userEmail: {
    fontSize: 14,
    color: 'gray'
  }
})

export default CustomDrawerContent
