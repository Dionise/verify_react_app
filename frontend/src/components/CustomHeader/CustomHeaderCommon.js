import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const CustomHeaderCommon = ({navigation, onSave}) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.navigate('Search')}>
        <Text style={styles.back}>Back</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onSave}>
        <Text style={styles.save}>Save</Text>
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
    backgroundColor: '#fff',
  },
  back: {
    color: 'black',
    fontSize: 16,
    paddingTop: 20,
  },

  save: {
    color: 'black',
    fontSize: 16,
    paddingTop: 20,
  },
});

export default CustomHeaderCommon;
