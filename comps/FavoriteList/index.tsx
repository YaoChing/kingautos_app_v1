import React, {useEffect, useMemo, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableHighlight,
  Dimensions,
  FlatList,
  Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';

import TotalCategories from '../../configs/TotalCategories';

const {height, width} = Dimensions.get('window');

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
            style={{fontSize: (Platform.OS === 'ios') ? 16 : 18}}>
            請選擇有興趣的分類，上限八個
          </Text>
        </View>
        <FlatList
          style={{flex: 1}}
          numColumns={3}
          data={TotalCategories}
          initialNumToRender={16}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => {
            return (
              <View
                style={{width: width * 0.3, marginHorizontal: 5, marginVertical: 10, borderColor: '#c2c2c2', borderWidth: 1, borderRadius: 10, justifyContent: 'center', alignItems: 'center', paddingVertical: 10}}>
                <Text
                  style={{fontSize: (Platform.OS === 'ios') ? 16 : 18}}>{item.name}</Text>
              </View>
            );
          }}
        />
        <View
          style={{flex: 0.1, flexDirection: 'row'}}>
          <TouchableHighlight
            underlayColor="transparent"
            onPress={() => props.navigation.goBack()}
            style={{flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center', margin: 1, backgroundColor: '#b1090c'}} >
            <Text
              style={{fontSize: (Platform.OS === 'ios') ? 16 : 18, color: '#ffffff'}}>
              確定
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor="transparent"
            onPress={() => props.navigation.goBack()}
            style={{flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center', marginVertical: 1, marginRight: 1, backgroundColor: '#888'}} >
            <Text
              style={{fontSize: (Platform.OS === 'ios') ? 16 : 18, color: '#ffffff'}}>
              取消
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    </SafeAreaView>
  );
}