import React, { useState } from 'react'
import { View, TextInput, Button } from 'react-native'
import { resetScreenStyles } from '../Comon.Style'

const ResetScreen = () => {
  const [email, setEmail] = useState('')

  const handleSubmit = () => {
    // Implement form submission logic here
  }

  return (
    <View style={resetScreenStyles.container}>
      <TextInput
        style={resetScreenStyles.input}
        placeholder="Enter email"
        value={email}
        onChangeText={setEmail}
      />
      <Button title="Reset Password" onPress={handleSubmit} />
    </View>
  )
}

export default ResetScreen
