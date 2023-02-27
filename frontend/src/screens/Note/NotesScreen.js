import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, TextInput, Button } from 'react-native'
import { useRoute } from '@react-navigation/native'

const NotesScreen = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [isFetching, setIsFetching] = useState(false)
  const route = useRoute()
  const { address } = route.params?.address || {}

  const handleAddNote = async () => {
    // eslint-disable-next-line no-console
    console.log(newNote)
  }

  return (
    <View>
      <Text>Notes for {address}</Text>
      <FlatList
        data={notes}
        renderItem={({ item }) => <Text>{item.note}</Text>}
        keyExtractor={item => item.id.toString()}
        refreshing={isFetching}
      />
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={setNewNote}
        value={newNote}
      />
      <Button title="Add note" onPress={handleAddNote} />
    </View>
  )
}

export default NotesScreen
