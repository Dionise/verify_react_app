import React, { useState } from 'react'
import { View, TextInput, Button, TouchableOpacity, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { resetScreenStyles } from '../Comon.Style.js'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../../../../frontend/src/stores/user.reducer.js'

const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const [errorMessage, setErrorMessage] = useState(null)
  const [emailFocused, setEmailFocused] = useState(false)
  const [passwordFocused, setPasswordFocused] = useState(false)

  const handleEmailChange = text => {
    setEmail(text)
    setErrorMessage(null)
  }

  const handlePasswordChange = text => {
    setPassword(text)
    setErrorMessage(null)
  }

  const handleLogin = () => {
    dispatch(login({ email, password }))
      .then(response => {
        if (response.payload.token) {
          navigation.navigate('Search')
        } else {
          // Display error message to user
          setErrorMessage('Invalid email or password')
        }
      })
      .catch(error => {
        // Display error message to user
        setErrorMessage('Invalid email or password')
      })
  }

  return (
    <View style={resetScreenStyles.container}>
      <TextInput
        style={resetScreenStyles.input}
        placeholder="Enter email"
        value={email}
        onChangeText={handleEmailChange}
      />
      <TextInput
        style={resetScreenStyles.input}
        placeholder="Enter password"
        value={password}
        secureTextEntry
        onChangeText={handlePasswordChange}
      />

      {errorMessage && (
        <Text style={resetScreenStyles.error}>{errorMessage}</Text>
      )}
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
