import React from 'react';
import {
  View,
  Text,
  TouchableHighlight
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/EvilIcons';
import Icon3 from 'react-native-vector-icons/AntDesign';

export interface GProps {
  screenProps: {state: any, dispatch: any}
}

export default (props: GProps) => {
  return (
    <View
      style={{flex: 0.1, backgroundColor: '#222222'}}>
      <View
        style={{flex: 1, flexDirection: 'row'}}>
        <TouchableHighlight
          underlayColor={'transparent'}
          onPress={() => props.screenProps.dispatch({type: 'SetCateFromFooter', data: 'index'})}
          style={{flex: 0.2, justifyContent: 'center', alignItems: 'center'}}>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Icon name="home" size={25} color="#ffffff" />
            <Text
              style={{fontSize: 10, color: '#c2c2c2'}}>首頁</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          underlayColor={'transparent'}
          onPress={() => {
            props.screenProps.dispatch({type: 'SetCateFromFooter', data: 'all'});
          }}
          style={{flex: 0.2, justifyContent: 'center', alignItems: 'center', backgroundColor: (props.screenProps.state.nowCate === 'all') ? '#b71d29' : '#222222'}}>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Icon name="list" size={25} color="#ffffff" />
            <Text
              style={{fontSize: 10, color: '#c2c2c2'}}>最新文章</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          underlayColor={'transparent'}
          onPress={() => {
            props.screenProps.dispatch({type: 'SetIsShowSideBrand', data: true});
          }}
          style={{flex: 0.2, justifyContent: 'center', alignItems: 'center', backgroundColor: (props.screenProps.state.nowArea === 'brandArea') ? '#b71d29' : '#222222'}}>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Icon3 name="car" size={25} color="#ffffff" />
            <Text
              style={{fontSize: 10, color: '#c2c2c2'}}>汽車品牌</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          underlayColor={'transparent'}
          onPress={() => props.screenProps.dispatch({type: 'SetTagFromFooter', data: 'BMW'})}
          style={{flex: 0.2, justifyContent: 'center', alignItems: 'center', backgroundColor: (props.screenProps.state.nowArea === 'faqArea') ? '#b71d29' : '#222222'}}>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Icon name="megaphone" size={25} color="#ffffff" />
            <Text
              style={{fontSize: 10, color: '#c2c2c2'}}>買車請借問</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          underlayColor={'transparent'}
          onPress={() => true}
          style={{flex: 0.2, justifyContent: 'center', alignItems: 'center', backgroundColor: (props.screenProps.state.nowArea === 'memberArea') ? '#b71d29' : '#222222'}}>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Icon2 name="user" size={35} color="#ffffff" />
            <Text
              style={{fontSize: 10, color: '#c2c2c2'}}>會員登入</Text>
          </View>
        </TouchableHighlight>
      </View>
    </View>
  );
}