import { StyleSheet } from 'react-native'

export const propertyDetailsStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  imageContainer: {
    height: 200,
    marginBottom: 20
  },
  image: {
    width: '100%',
    height: '100%'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'gray',
    marginBottom: 10
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10
  },
  description: {
    fontSize: 16,
    marginBottom: 10
  },
  mapContainer: {
    flex: 1,
    height: 200,
    marginTop: 20,
    borderRadius: 10,
    overflow: 'hidden'
  },
  map: {
    flex: 1
  }
})
