import React, { useEffect } from 'react'
import { View, Image, StyleSheet, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const SplashScreen = () => {
  const navigation = useNavigation()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Search')
    }, 1000)

    return () => {
      clearTimeout(timer)
    }
  }, [navigation])

  return (
    <View style={styles.container}>
      {/* <Image source={require('../assets/logo.png')} style={styles.logo} />*/}
      <Text>okoko</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  logo: {
    width: 200,
    height: 200
  }
})

export default SplashScreen
