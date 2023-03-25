import {StyleSheet} from 'react-native';

export const propertyDetailsStyles = StyleSheet.create({
  container: {backgroundColor: 'white'},

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

  description: {
    fontSize: 22,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 14,
    marginBottom: 5,
  },
  mapContainer: {
    flex: 1,
    height: 200,
    borderRadius: 10,
  },

  descriptionContainer: {
    flex: 1,
    marginTop: 20,
    borderRadius: 10,
    overflow: 'hidden',
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
  },
  rentmortgage: {
    backgroundColor: '#F5F5F5',
    alignSelf: 'stretch',
    paddingHorizontal: 10,
    paddingTop: 10,
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
