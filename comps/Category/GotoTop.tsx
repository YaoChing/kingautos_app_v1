import React, {useState, useEffect, useMemo} from 'react';
import {
  View,
  TouchableHighlight,
  Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

const {height, width} = Dimensions.get('window');

export interface GProps {
  goToTop: () => void
};

export default (props: GProps) => {
  return (
    <TouchableHighlight
      underlayColor={'transparent'}
      onPress={() => props.goToTop()}
      style={{position: 'absolute', bottom: 55, right: 5, width: 50, height: 50}} >
      <View
        style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#b71d29', borderRadius: 10, opacity: 0.8}}>
        <Icon name="arrow-with-circle-up" size={40} color="#ffffff" />
      </View>
    </TouchableHighlight>
  );
}