import React, {useState} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import CustomHeaderCommon from 'src/components/CustomHeader/CustomHeaderCommon';

const GeneralViewScreen = ({navigation}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleSaveNote = () => {
    console.log('Note saved:');
  };

  return (
    <>
      <CustomHeaderCommon navigation={navigation} onSave={handleSaveNote} />
      <View style={styles.container}>
        {menuOpen && (
          <View style={styles.menu}>
            <TouchableOpacity style={styles.link}>
              <Text>Images</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.link}>
              <Text
                title="Check"
                onPress={() => navigation.navigate('CheckListScreen')}
                style={styles.textoption}>
                Check
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.link}>
              <Text
                title="Notes"
                onPress={() => navigation.navigate('AddNote')}
                style={styles.textoption}>
                Notes
              </Text>
            </TouchableOpacity>
          </View>
        )}
        <TouchableOpacity style={styles.button} onPress={toggleMenu}>
          <Text style={styles.buttonText}>+ Add</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    paddingBottom: 10,
    paddingRight: 10,
  },
  button: {
    backgroundColor: '#4285F4',
    borderRadius: 90,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  menu: {
    borderRadius: 10,
    position: 'absolute',
    bottom: '15%',
    right: '5%',
    elevation: 5,
  },
  link: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
});

export default GeneralViewScreen;
