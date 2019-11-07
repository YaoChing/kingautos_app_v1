import React, {useEffect, useMemo, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableHighlight
} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';

import TotalCategories from '../../configs/TotalCategories';

export interface GProps {
  screenProps: {state: any, dispatch: any},
  navigation: any
};

export interface FavoriteListGProps extends GProps {};

export default (props: FavoriteListGProps) => {
  useEffect(() => {
    return () => {}
  });

  useMemo(() => {}, []);

  return (
    <SafeAreaView
      style={{flex: 1}}>
      <View
        style={{flex: 1, flexDirection: 'column'}} >
        <TouchableHighlight
          underlayColor="transparent"
          onPress={() => props.navigation.goBack()}
          style={{flex: 0.1, justifyContent: 'center', alignItems: 'flex-start'}}>
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center', padding: 5}}>
            <Icon name="close" size={35} color="#222222" />
            <Text
              style={{color: '#c2c2c2', fontSize: 10}}>關閉</Text>
          </View>
        </TouchableHighlight>
        <View
          style={{flex: 0.05, padding: 10, justifyContent: 'center', alignItems: 'center'}}>
          <Text
            style={{fontSize: 16}}>
            請選擇有興趣的分類，上限八個
          </Text>
        </View>
        <View
          style={{flex: 1, padding: 5, flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
          {TotalCategories.map((value) => {
            return (
              <View
                style={{padding: 20, marginHorizontal: 5, marginVertical: 10, borderColor: '#c2c2c2', borderWidth: 1, borderRadius: 10}}>
                <Text
                  style={{fontSize: 16}}>{value.name}</Text>
              </View>
            );
          })}
        </View>
        <View
          style={{flex: 0.1, flexDirection: 'row'}}>
          <TouchableHighlight
            underlayColor="transparent"
            onPress={() => props.navigation.goBack()}
            style={{flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center', margin: 1, backgroundColor: '#b1090c'}} >
            <Text
              style={{fontSize: 16, color: '#ffffff'}}>
              確定
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor="transparent"
            onPress={() => props.navigation.goBack()}
            style={{flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center', marginVertical: 1, marginRight: 1, backgroundColor: '#888'}} >
            <Text
              style={{fontSize: 16, color: '#ffffff'}}>
              取消
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    </SafeAreaView>
  );
}