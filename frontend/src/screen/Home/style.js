import {StyleSheet} from 'react-native';

export const searchScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'center',
    width: '90%',
    maxWidth: 500,
  },
  textInputContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderTopWidth: 0,
    borderRadius: 5,
    padding: 0,
    marginVertical: 10,
  },
  textInput: {
    paddingHorizontal: 10,
    fontSize: 16,
  },
  listView: {
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    position: 'absolute',
    top: 50,
    width: '100%',
  },
  loginIcon: {
    position: 'absolute',
    top: '8%',
    right: '8%',
    zIndex: 1,
  },
});
