import React, {useEffect, useMemo} from 'react';
import {
  View,
  Text
} from 'react-native';

export interface GProps {
  screenProps: {state: any, dispatch: any}
};

export default (props: GProps) => {
  useEffect(() => {
    return () => {}
  });

  useMemo(() => {
  }, []);

  return (
    <View
      style={{flex: 1}}>
      <Text>brand scope</Text>
    </View>
  );
}