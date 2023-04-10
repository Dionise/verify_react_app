import React from 'react';
import {StyleSheet} from 'react-native';
import {View, Text, ScrollView} from 'react-native';
import CustomHeaderCommon from 'src/components/CustomHeader/CustomHeaderCommon';

const SettingsScreen = ({route, navigation}) => {
  return (
    <>
      <CustomHeaderCommon navigation={navigation} />
      <View style={styles.container}>
        <ScrollView>
          <View>
            <Text style={styles.text}>Settings</Text>
          </View>
          <View style={styles.option}>
            <Text
              title="AccountAccessScreen"
              onPress={() => navigation.navigate('AccountAccessScreen')}
              style={styles.textoption}>
              Account preferences
            </Text>
            <Text
              title="AccountPreferenceScreen"
              onPress={() => navigation.navigate('AccountPreferenceScreen')}
              style={styles.textoption}>
              Sign in & security
            </Text>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  textoption: {paddingTop: 15, fontSize: 20},
  text: {
    color: 'black',
    fontSize: 25,
    paddingLeft: 80,
    paddingTop: 10,
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

export default SettingsScreen;
