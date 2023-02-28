import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  FlatList,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  Platform,
  PermissionsIOS
} from 'react-native'
import { useRoute } from '@react-navigation/native'

import { notesScreenStyles } from './notesScreenStyles'

const NotesScreen = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [isFetching, setIsFetching] = useState(false)
  const [image, setImage] = useState(null)
  const route = useRoute()
  const { address } = route.params?.address || {}

  const handleAddNote = async () => {
    const newNoteObj = { note: newNote, image }
    setNotes([...notes, newNoteObj])
    setNewNote('')
    setImage(null)
  }

  return (
    <View style={notesScreenStyles.container}>
      <Text style={notesScreenStyles.header}>Notes for {address}</Text>
      <FlatList
        data={notes}
        renderItem={({ item }) => (
          <View style={notesScreenStyles.noteContainer}>
            <Text style={notesScreenStyles.note}>{item.note}</Text>
            {item.image && (
              <Image source={item.image} style={notesScreenStyles.image} />
            )}
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        refreshing={isFetching}
      />
      <View style={notesScreenStyles.inputContainer}>
        <TextInput
          style={notesScreenStyles.input}
          onChangeText={setNewNote}
          value={newNote}
          placeholder="Add note"
        />

        <Button title="Add note" onPress={handleAddNote} />
        {image && <Image source={image} style={notesScreenStyles.image} />}
      </View>
    </View>
  )
}

export default NotesScreen
