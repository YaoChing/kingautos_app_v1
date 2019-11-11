import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  FlatList,
  Dimensions
} from 'react-native';
import { Picker } from 'native-base';
import Icon from 'react-native-vector-icons/AntDesign';

import {
  getFqaData
} from '../../libs/ConnectApi';

import ItemCard from './ItemCard';
import GoToTop from '../Category/GotoTop';
import NotDataAlert from '../Category/NotDataAlert';
import Waiting from '../Category/Waiting';

const {height, width} = Dimensions.get('window');

export interface GProps {
  screenProps: {state: any, dispatch: any}
}

export interface FqaProps extends GProps {}

export default (props: FqaProps) => {
  let [nowPage, setNowPage] = useState(1);
  let [cateData, setCateData] = useState({data: [], totalPage: 1});
  let [showTopBtn, setShowTopBtn] = useState(false);
  let [isNoData, setIsNoData] = useState(false);
  let [nowTab, setNowTab] = useState('all');

  const _regenData = async (page: number) => {
    let result = await _getData(nowTab, page);

    if(result.data.length <= 0) {
      setIsNoData(true);
    }
    
    setNowPage(page);

    return result;
  }

  const _getData = async (type: string, page: number) => {
    let result: any = await getFqaData(type, page);

    return result;
  }

  useEffect(() => {
    return () => {}
  }, []);

  useMemo(() => {
    (async () => {
      if(isNoData) setIsNoData(false);

      setCateData({data: [], totalPage: 1});

      let result = await _regenData(1);

      setCateData(result);
    })()
  }, [props.screenProps.state.nowArea]);

  if(!isNoData && cateData.data.length <= 0) {
    return (
      <Waiting />
    )
  }

  if(isNoData) {
    return (
      <NotDataAlert />
    )
  }

  let _ref: any;
  let _isSend = false;

  const goToTop = () => {
    _ref.scrollToOffset({ animated: true, offset: 0 });
  }

  const onValueChange = async (value: string) => {
    if(isNoData) setIsNoData(false);

    setCateData({data: [], totalPage: 1});

    let result = await _getData(value, 1);

    setCateData(result);
    setNowTab(value);
  }

  return (
    <>
      <View
        style={{width, height: 45, borderLeftColor: '#b71d29', borderLeftWidth: 8, marginHorizontal: 10, marginVertical: 5, paddingHorizontal: 10}}>
        <Picker
          mode="dropdown"
          iosIcon={<Icon name="caretdown" />}
          style={{fontSize: 18, fontWeight: 'bold'}}
          placeholder="Select your SIM"
          placeholderStyle={{ color: "#bfc6ea" }}
          placeholderIconColor="#007aff"
          selectedValue={nowTab}
          onValueChange={onValueChange}
        >
          <Picker.Item label="最新問答" value="all" />
          <Picker.Item label="熱門問答" value="hotrank" />
          <Picker.Item label="品牌車系" value="品牌車系" />
          <Picker.Item label="新車選購" value="新車選購" />
        </Picker>
      </View>
      <FlatList
        style={{flex: 1}}
        data={cateData.data}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        removeClippedSubviews={true} 
        initialNumToRender={10}
        scrollEventThrottle={160}
        ItemSeparatorComponent={() => {
          return (
            <View 
              style={{height: 1, backgroundColor: '#b8b8b8'}} />
          )
        }}
        renderItem={({item, index}) => {
          return <ItemCard fqaData={item} {...props} />
        }} />
    </>
  );
}