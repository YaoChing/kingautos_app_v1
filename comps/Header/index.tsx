import React, {useState, useMemo, Fragment} from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  Animated, 
  Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';

import SideMenu from './SideMenu';
import SideBrand from './SideBrand';

const {height, width} = Dimensions.get('window');

export interface GProps {
  screenProps: {state: any, dispatch: any}
}

export default (props: GProps) => {
  let [sideMenuPos, setSideMenuPos] = useState(new Animated.ValueXY({x: 0 - width, y: 0}));
  let [sideBrandPos, setSideBrandPos] = useState(new Animated.ValueXY({x: width, y: 0}));

  const _showSideMenu = () => {
    Animated.timing(
      sideMenuPos,
      {
        toValue: {x: 0, y: 0},
        duration: 100,
        useNativeDriver: true
      }
    ).start();
  }

  const _hideSideMenu = () => {
    Animated.timing(
      sideMenuPos,
      {
        toValue: {x: 0 - width, y: 0},
        duration: 0,
        useNativeDriver: true
      }
    ).start();
  }

  const _showSideBrand = () => {
    Animated.timing(
      sideBrandPos,
      {
        toValue: {x: 0, y: 0},
        duration: 100,
        useNativeDriver: true
      }
    ).start();
  }

  const _hideSideBrand = () => {
    Animated.timing(
      sideBrandPos,
      {
        toValue: {x: width, y: 0},
        duration: 0,
        useNativeDriver: true
      }
    ).start();
  }

  useMemo(() => {
    if(props.screenProps.state.isShowSideMenu) {
      _showSideMenu();
    } else {
      _hideSideMenu();
    }
  }, [props.screenProps.state.isShowSideMenu]);

  useMemo(() => {
    if(props.screenProps.state.isShowSideBrand) {
      _showSideBrand();
    } else {
      _hideSideBrand();
    }
  }, [props.screenProps.state.isShowSideBrand]);

  return (
    <Fragment>
      <View
        style={{flex: 0.07, backgroundColor: '#222222'}}>
        <View
          style={{flex: 1, flexDirection: 'row'}}>
          <TouchableHighlight
            underlayColor={'transparent'}
            onPress={() => {
              props.screenProps.dispatch({type: 'SetIsShowSideMenu', data: !props.screenProps.state.isShowSideMenu});
            }}
            style={{flex: 0.2}}>
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Icon name="navicon" size={30} color={'#ffffff'} />
              <Text
                style={{fontSize: 10, color: '#c2c2c2'}}>選單</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor={'transparent'}
            onPress={() => true}
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text
              style={{fontSize: 28, color: '#ffffff'}}>KingAutos</Text>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor={'transparent'}
            onPress={() => true}
            style={{flex: 0.2}}>
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Icon name="search" size={30} color={'#ffffff'} />
              <Text
                style={{fontSize: 10, color: '#c2c2c2'}}>搜尋</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
      <Animated.View
        style={{
          position: 'absolute', 
          width, 
          height, 
          transform: [{translateX: sideMenuPos.x}],
          zIndex: 999
        }}>
        <SideMenu {...props} />
      </Animated.View>
      <Animated.View
        style={{
          position: 'absolute', 
          width, 
          height, 
          transform: [{translateX: sideBrandPos.x}],
          zIndex: 999
        }}>
        <SideBrand {...props} />
      </Animated.View>
    </Fragment>
  );
}