import React from 'react';
import {
  View,
  Text,
  Platform
} from 'react-native';

export default () => {
  return (
    <View
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text
        style={{fontSize: (Platform.OS === 'ios') ? 16 : 18, fontWeight: 'bold'}}>查無資料</Text>
    </View>
  )
}