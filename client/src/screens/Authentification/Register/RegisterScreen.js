import React, {useState} from 'react';
import {View, TextInput, Button, TouchableOpacity, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {resetScreenStyles} from '../Comon.Style';
import {register} from '../../../stores/user.reducer.js';
import {useDispatch, useSelector} from 'react-redux';

const RegisterScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const loading = useSelector(state => {
    return state.user.loading;
  });

  const error = useSelector(state => {
    return state.user.error;
  });

  const user = useSelector(state => {
    return state.user;
  });

  const handleRegister = () => {
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    dispatch(
      register({
        firstName,
        lastName,
        email,
        password,
      }),
    );
  };

  const handleGoBack = () => {
    navigation.navigate('Search');
  };

  return (
    <View style={resetScreenStyles.container}>
      <TextInput
        style={resetScreenStyles.input}
        placeholder="Enter first name"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={resetScreenStyles.input}
        placeholder="Enter last name"
        value={lastName}
        onChangeText={setLastName}
      />
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
      <TextInput
        style={resetScreenStyles.input}
        placeholder="Confirm password"
        value={confirmPassword}
        secureTextEntry
        onChangeText={setConfirmPassword}
      />
      <Button title="Register" onPress={handleRegister} disabled={loading} />
      {error && <Text style={resetScreenStyles.error}>{error}</Text>}
      <TouchableOpacity
        style={resetScreenStyles.navButton}
        onPress={() => navigation.navigate('Login')}>
        <Text>Already have an account? Log in here.</Text>
      </TouchableOpacity>

      <Button title="Go back to Search" onPress={handleGoBack} />
    </View>
  );
};

export default RegisterScreen;
