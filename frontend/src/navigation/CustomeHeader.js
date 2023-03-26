import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const CustomHeader = ({navigation, title}) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.back}>Back</Text>
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
        <Text style={styles.settings}>Settings</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    height: 60,
    backgroundColor: '#333',
  },
  back: {
    color: '#fff',
    fontSize: 16,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  settings: {
    color: '#fff',
    fontSize: 16,
  },
});

export default CustomHeader;
