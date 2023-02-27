import React, { useState } from 'react'
import { View, TextInput, Button, TouchableOpacity, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { resetScreenStyles } from '../Comon.Style.js'

const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigation = useNavigation()

  const handleLogin = () => {
    // Make API request to log in user
    // ...

    // Navigate to HomeScreen
    navigation.navigate('Search')
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
