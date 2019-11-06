import React from 'react';
import {
  View,
  Text
} from 'react-native';
import { Spinner } from 'native-base';

export default () => {
  return (
    <View
      style={{flex: 1}}>
      <Spinner color='#b71d29' />
    </View>
  )
}