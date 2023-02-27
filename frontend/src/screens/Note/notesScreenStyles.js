import { StyleSheet } from 'react-native'

const notesScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    width: '100%'
  },
  button: {
    width: '100%',
    marginTop: 10
  },
  imagePickerContainer: {
    marginBottom: 20
  }
})

export { notesScreenStyles }
