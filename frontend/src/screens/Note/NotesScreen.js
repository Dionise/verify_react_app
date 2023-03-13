import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  FlatList,
  Button,
  Image,
} from 'react-native';

import {useRoute} from '@react-navigation/native';

import {notesScreenStyles} from './notesScreenStyles.js';
import {checklistStyles} from './checklistStyles.js';

const NotesScreen = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [image, setImage] = useState(null);
  const route = useRoute();

  const {address} = route.params?.address || {};

  const handleAddNote = () => {
    if (newNote.trim() === '') {
      alert('Please enter some text to add a note.');
      return;
    }

    const newNoteObj = {note: newNote};
    if (image) {
      newNoteObj.image = image;
    }
    setNotes([...notes, newNoteObj]);
    setNewNote('');
    setImage(null);
  };

  const handleDeleteNote = index => {
    const newNotes = [...notes];
    newNotes.splice(index, 1);
    setNotes(newNotes);
  };
  return (
    <View style={notesScreenStyles.container}>
      <View style={notesScreenStyles.notesContainer}>
        <Text style={notesScreenStyles.header}>Notes for {address}</Text>
        <View style={notesScreenStyles.inputContainer}>
          <View style={notesScreenStyles.inputWrapper}>
            <TextInput
              style={notesScreenStyles.input}
              onChangeText={setNewNote}
              value={newNote}
              multiline={true}
              placeholder="Add note"
            />
          </View>
          <TouchableOpacity
            style={notesScreenStyles.addButton}
            onPress={handleAddNote}>
            <Text style={notesScreenStyles.addButtonText}>Add</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={notes}
          renderItem={({item, index}) => (
            <View style={notesScreenStyles.noteContainer}>
              <Text style={notesScreenStyles.note}>{item.note}</Text>
              <TouchableOpacity
                style={notesScreenStyles.deleteButton}
                onPress={() => handleDeleteNote(index)}>
                <Text style={notesScreenStyles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          refreshing={false}
        />
      </View>
    </View>
  );
};

export default NotesScreen;
