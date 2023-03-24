import {StyleSheet} from 'react-native';

export const propertyDetailsStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  addressButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  addressBox: {
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    maxWidth: 300,
  },
  addressText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  favoriteButton: {
    backgroundColor: '#007AFF',
    borderRadius: 5,
    padding: 10,
    minWidth: 100, // Make sure the favorite button has a minimum width
    alignItems: 'center', // Align the favorite button text to the center
    position: 'absolute',
    right: 0,
    marginLeft: 0,
  },
  favoriteButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  descriptionContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  mapContainer: {
    flex: 1,
    height: 200,
    marginTop: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
  map: {
    flex: 1,
  },
  mapExpandButton: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 5,
    alignSelf: 'flex-end',
    marginTop: -40,
    marginRight: 10,
  },
  mapExpandButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  additionalInfo: {
    marginTop: 10,
    marginBottom: 10,
  },

  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    marginBottom: 10,
  },
});
