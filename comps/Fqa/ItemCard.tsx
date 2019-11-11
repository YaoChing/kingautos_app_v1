import React, { useEffect, useMemo } from 'react';
import {
  View,
  Text,
  Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Entypo';
import moment from 'moment';

const {height, width} = Dimensions.get('window');

export interface GProps {
  screenProps: {state: any, dispatch: any}
}

export interface FqaProps extends GProps {
  fqaData: any
}

export default (props: FqaProps) => {
  let item = props.fqaData;

  useEffect(() => {
    return () => {}
  }, []);

  useMemo(() => {}, []);

  return (
    <View
      style={{flex: 1}}>
      <View 
        style={{width: width - 20, height: 300, margin: 10, borderColor: '#c2c2c2', borderWidth: 1, borderRadius: 10}}>
        <View
          style={{flex: 0.35, flexDirection: 'row', marginHorizontal: 10}}>
          <View
            style={{flex: 1, justifyContent: 'center'}}>
            <View
              style={{width: 120, height: 40, borderColor: '#b71d29', borderWidth: 1, borderRadius: 15, justifyContent: 'center', alignItems: 'center', backgroundColor: '#b71d29'}}>
              <Text
                style={{fontSize: 18, color: '#ffffff'}}>{item.category[0]}</Text>
            </View>
          </View>
          <View
            style={{flex: 0.35, padding: 10, alignItems: 'flex-end', justifyContent: 'center'}}>
            <Text
              style={{fontSize: 14, color: '#c2c2c2'}}>{moment(item.date * 1000).format('YYYY-MM-DD')}</Text>
            <View
              style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
              <Icon2 name={'eye'} color='#c2c2c2' size={20} />
              <View
                style={{marginLeft: 5}}>
                <Text
                  style={{fontSize: 16, color: '#c2c2c2'}}>0人看過</Text>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{flex: 0.4, marginHorizontal: 10, borderBottomWidth: 1, borderBottomColor: '#c2c2c2', justifyContent: 'center'}}>
          <Text
            numberOfLines={2}
            style={{fontSize: 18, lineHeight: 22, fontWeight: 'bold', color: '#222222'}}>{item.title}</Text>
        </View>
        <View
          style={{flex: 1, marginHorizontal: 10}}>
          <View style={{flex: 0.4, flexDirection: 'row', alignItems: 'center'}}>
            <Icon name={'user'} color='#b71d29' size={18} />
            <View
              style={{marginHorizontal: 5}}>
              <Text
                style={{color: '#b71d29', fontSize: 15}}>{item.nickname}</Text>
            </View>
            <View
              style={{marginHorizontal: 5}}>
              <Text
                style={{color: '#222222', fontSize: 15}}>提問</Text>
            </View>
          </View>
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text
              numberOfLines={3}
              style={{fontSize: 18, lineHeight: 22}} >{item.content}</Text>
          </View>
          <View style={{flex: 0.4, flexDirection: 'row', alignItems: 'center'}}>
            <View style={{flex: 1, flexDirection: 'row', paddingHorizontal: 5, alignItems: 'center'}}>
              <Text
                style={{color: '#c2c2c2', fontSize: 15}}>我想回答</Text>
              <Icon2 name={'reply'} color='#c2c2c2' size={22} />
            </View>
            <View style={{flex: 0.3, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 5, justifyContent: 'center'}}>
              <Icon2 name={'message'} color='#c2c2c2' size={22} />
              <Text
                style={{color: '#222222', fontSize: 15}}>0</Text>
            </View>
            <View style={{flex: 0.4, flexDirection: 'row', alignItems: 'flex-end', paddingHorizontal: 5, justifyContent: 'center'}}>
              <Text
                style={{color: '#b71d29', fontSize: 15}}>繼續閱讀</Text>
              <Icon name={'caretright'} color='#b71d29' size={19} />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}