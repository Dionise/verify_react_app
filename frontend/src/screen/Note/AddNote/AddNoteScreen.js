import React, {useState} from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import CustomHeaderNotes from 'src/components/CustomHeader/CustomHeaderNotes';

const NoteScreenOptionScreen = ({navigation}) => {
  const [newNote, setNewNote] = useState('');

  const handleSaveNote = () => {
    console.log('Note saved:', newNote);
  };

  return (
    <View style={styles.container}>
      <CustomHeaderNotes navigation={navigation} onSave={handleSaveNote} />
      <TextInput
        style={styles.input}
        onChangeText={setNewNote}
        value={newNote}
        multiline={true}
        placeholder="Add Comments"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},

  input: {
    paddingLeft: 10,
    paddingTop: 10,
    flex: 1,
  },
});

export default NoteScreenOptionScreen;
