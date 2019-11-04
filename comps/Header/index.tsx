import React, {useState, useMemo, Fragment} from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  Animated, 
  Dimensions,
  TextInput,
  Keyboard
} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';

import SideMenu from './SideMenu';
import SideBrand from './SideBrand';
import Search from './Search';


const {height, width} = Dimensions.get('window');

export interface GProps {
  screenProps: {state: any, dispatch: any}
}

export default (props: GProps) => {
  let [sideMenuPos, setSideMenuPos] = useState(new Animated.ValueXY({x: 0 - width, y: 0}));
  let [sideBrandPos, setSideBrandPos] = useState(new Animated.ValueXY({x: width, y: 0}));
  let [searchHotKeywordBtnPos, setSearchHotKeywordBtnPos] = useState(new Animated.ValueXY({x: width, y: 0}));
  let [searchHotKeywordListPos, setSearchHotKeywordListPos] = useState(new Animated.ValueXY({x: 0, y: height}));

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

  const _showSearch = () => {
    Animated.parallel([
      Animated.timing(
        searchHotKeywordBtnPos,
        {
          toValue: {x: 0, y: 0},
          duration: 100,
          useNativeDriver: true
        }
      ),
      Animated.timing(
        searchHotKeywordListPos,
        {
          toValue: {x: 0, y: 0},
          duration: 100,
          useNativeDriver: true
        }
      )
    ]).start();
  }

  const _hideSearch = () => {
    Animated.parallel([
      Animated.timing(
        searchHotKeywordBtnPos,
        {
          toValue: {x: width, y: 0},
          duration: 0,
          useNativeDriver: true
        }
      ),
      Animated.timing(
        searchHotKeywordListPos,
        {
          toValue: {x: 0, y: height},
          duration: 0,
          useNativeDriver: true
        }
      )
    ]).start();
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

  useMemo(() => {
    if(props.screenProps.state.isShowSearch) {
      _showSearch();
    } else {
      _hideSearch();
    }
  }, [props.screenProps.state.isShowSearch]);

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
            onPress={() => props.screenProps.dispatch({type: 'SetIsShowSearch', data: !props.screenProps.state.isShowSearch})}
            style={{flex: 0.2}}>
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Icon name="search" size={30} color={'#ffffff'} />
              <Text
                style={{fontSize: 10, color: '#c2c2c2'}}>搜尋</Text>
            </View>
          </TouchableHighlight>
        </View>
        <Animated.View
          style={{
            position: 'absolute', 
            width: width, 
            height: height * 0.07,
            zIndex: 999,
            bottom: 0,
            transform: [{translateX: searchHotKeywordBtnPos.x}],
          }}>
          <View
            style={{position: 'absolute', width, right: 0, backgroundColor: '#ffffff'}}>
            <View
              style={{flex: 1, flexDirection: 'row', marginHorizontal: 20, paddingVertical: 5}}>
              <View
                style={{flex: 1, justifyContent: 'center'}}>
                <TextInput 
                  style={{paddingHorizontal: 25, borderBottomColor: '#222222', borderBottomWidth: 1}}
                  placeholder='搜尋關鍵字' />
              </View>
              <View
                style={{flex: 0.2, justifyContent: 'center', alignItems: 'center'}}>
                <Icon name="search" size={30} />
              </View>
              <TouchableHighlight
                underlayColor={'transparent'}
                onPress={() => {
                  Keyboard.dismiss();
                  props.screenProps.dispatch({type: 'SetIsShowSearch', data: !props.screenProps.state.isShowSearch})
                }}
                style={{flex: 0.2, justifyContent: 'center', alignItems: 'center'}}>
                <Text>取消</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Animated.View>
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
      <Animated.View
        style={{
          position: 'absolute', 
          width, 
          height: height * 0.91,
          zIndex: 999,
          bottom: 0,
          transform: [{translateY: searchHotKeywordListPos.y}]
        }}>
        <Search {...props} />
      </Animated.View>
    </Fragment>
  );
}