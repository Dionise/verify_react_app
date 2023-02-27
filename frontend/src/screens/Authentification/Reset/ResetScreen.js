import React, { useState } from 'react'
import { View, TextInput, Button, Text } from 'react-native'
import { resetScreenStyles } from '../Comon.Style'

import { sendResetPassword } from '@stores/user.reducer'

const ResetScreen = () => {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [resetSent, setResetSent] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    try {
      await sendResetPassword({ email })
      setSubmitted(true)
      setResetSent(true)
    } catch (err) {
      setSubmitted(true)
      setError(err.message)
    }
  }

  return (
    <View style={resetScreenStyles.container}>
      {resetSent ? (
        <Text style={resetScreenStyles.message}>
          If there is an account associated with the email {email}, you will
          receive a link to reset your password shortly.
        </Text>
      ) : (
        <>
          <TextInput
            style={resetScreenStyles.input}
            placeholder="Enter email"
            value={email}
            onChangeText={setEmail}
          />
          <Button title="Reset Password" onPress={handleSubmit} />
        </>
      )}
      {submitted && error && (
        <Text style={resetScreenStyles.error}>{error}</Text>
      )}
    </View>
  )
}

export default ResetScreen
