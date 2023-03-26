import React, {useState, useEffect} from 'react';
import {TextInput, Button, Switch, StyleSheet, Image} from 'react-native';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';

const AccountAccessScreen = ({route, navigation}) => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          <Text style={styles.text}>Account preferences</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  textoption: {paddingTop: 15, fontSize: 20},
  text: {
    color: 'black',
    fontSize: 25,
    paddingLeft: 80,
    paddingTop: 40,
    fontWeight: 'bold',
  },

  option: {
    paddingLeft: 40,
    paddingTop: 40,
  },
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
});

export default AccountAccessScreen;
