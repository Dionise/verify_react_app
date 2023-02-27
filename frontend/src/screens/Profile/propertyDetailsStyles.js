import { StyleSheet } from 'react-native'

export const propertyDetailsStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff'
  },
  imageContainer: {
    width: '100%',
    height: 200,
    marginBottom: 20
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10
  },
  text: {
    fontSize: 16,
    marginBottom: 10
  },
  description: {
    fontSize: 16,
    marginBottom: 20
  }
})
