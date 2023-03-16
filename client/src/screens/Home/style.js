import {StyleSheet} from 'react-native';

export const searchScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    maxWidth: 500,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    marginRight: 10,
  },
  searchIcon: {
    color: 'white',
    fontSize: 20,
  },
  searchButton: {
    backgroundColor: 'blue',
    borderRadius: 5,
    padding: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  loginIcon: {
    position: 'absolute',
    top: '8%',
    right: '8%',
    zIndex: 1,
  },
});
