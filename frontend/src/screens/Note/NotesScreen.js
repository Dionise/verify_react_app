import React, { useState } from 'react'
import {
  View,
  Text,
  FlatList,
  TextInput,
  Button,
  TouchableHighlight,
  Image
} from 'react-native'
import { useRoute } from '@react-navigation/native'
import { notesScreenStyles } from './notesScreenStyles.js'
import ImagePicker from 'react-native-image-picker'

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

  const pickImage = () => {
    const options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    }

    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker')
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error)
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton)
      } else {
        const source = { uri: response.uri }
        setImage(source)
      }
    })
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
        <TouchableHighlight
          style={notesScreenStyles.button}
          onPress={pickImage}>
          <Text style={notesScreenStyles.buttonText}>Add Image</Text>
        </TouchableHighlight>
        <Button title="Add note" onPress={handleAddNote} />
        {image && <Image source={image} style={styles.image} />}
      </View>
    </View>
  )
}

export default NotesScreen
