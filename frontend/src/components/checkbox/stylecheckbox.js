import { StyleSheet } from 'react-native'

export const checkboxStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  checkbox: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  checkmark: {
    height: 16,
    width: 16,
    borderRadius: 8,
    backgroundColor: '#00BFFF'
  },
  label: {
    marginLeft: 10
  }
})
