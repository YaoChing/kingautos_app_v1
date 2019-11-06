import React from 'react';
import {
  View,
  Text
} from 'react-native';

export default () => {
  return (
    <View
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text
        style={{fontSize: 18, fontWeight: 'bold'}}>查無資料</Text>
    </View>
  )
}