import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, TextInput, Button } from 'react-native'
import { useRoute } from '@react-navigation/native'

const NotesScreen = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [isFetching, setIsFetching] = useState(false)
  const route = useRoute()
  const { address } = route.params?.address || {}

  const fetchNotes = async () => {
    setIsFetching(true)
    try {
      const response = await fetch(
        `https://your-drf-api.com/notes?address=${address}`
      )
      const data = await response.json()
      if (data.length === 0) {
        setNotes([])
      } else {
        setNotes(data)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsFetching(false)
    }
  }

  const handleAddNote = async () => {
    try {
      const response = await fetch('https://your-drf-api.com/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ address, note: newNote })
      })
      const data = await response.json()
      setNotes(notes.concat(data))
      setNewNote('')
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchNotes()
  }, [])

  return (
    <View>
      <Text>Notes for {address}</Text>
      <FlatList
        data={notes}
        renderItem={({ item }) => <Text>{item.note}</Text>}
        keyExtractor={item => item.id.toString()}
        refreshing={isFetching}
        onRefresh={fetchNotes}
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
