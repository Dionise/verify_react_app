import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

const MyCheckbox = ({ title, checked, onPress }) => {
  const checkboxSize = 20
  const checkboxBorderWidth = 2

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View
          style={{
            height: checkboxSize,
            width: checkboxSize,
            borderRadius: checkboxSize / 2,
            borderWidth: checkboxBorderWidth,
            borderColor: checked ? '#00BFFF' : '#696969',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          {checked && (
            <View
              style={{
                height: checkboxSize - checkboxBorderWidth * 2,
                width: checkboxSize - checkboxBorderWidth * 2,
                borderRadius: (checkboxSize - checkboxBorderWidth * 2) / 2,
                backgroundColor: '#00BFFF'
              }}
            />
          )}
        </View>
        <Text style={{ marginLeft: 10 }}>{title}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default MyCheckbox
