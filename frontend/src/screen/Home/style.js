import {StyleSheet} from 'react-native';

export const searchScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'center',
    width: '80%',
    maxWidth: 500,
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  ButtonContainer: {
    paddingTop: 20,
    flex: 'start',
    flexDirection: 'row',
  },
});
