import React, { useState } from 'react'
import { View, TextInput, Button, TouchableOpacity, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { resetScreenStyles } from '../Comon.Style.js'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../../stores/user.reducer.js'

const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigation = useNavigation()
  const dispatch = useDispatch()

  const handleLogin = () => {
    dispatch(login({ email, password }))
      .then(() => {
        navigation.navigate('Search')
      })
      .catch(error => {
        console.log(error)
        // Display error message to user
      })
  }

  return (
    <View style={resetScreenStyles.container}>
      <TextInput
        style={resetScreenStyles.input}
        placeholder="Enter email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={resetScreenStyles.input}
        placeholder="Enter password"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
      />
      <Button title="Log in" onPress={handleLogin} />
      <TouchableOpacity
        style={resetScreenStyles.navButton}
        onPress={() => navigation.navigate('Register')}>
        <Text>Don't have an account? Register here.</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={resetScreenStyles.navButton}
        onPress={() => navigation.navigate('Reset')}>
        <Text>Forgot your password? Reset it here.</Text>
      </TouchableOpacity>
    </View>
  )
}

export default LoginScreen
