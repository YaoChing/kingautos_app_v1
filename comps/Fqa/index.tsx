import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  FlatList,
  Dimensions
} from 'react-native';

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

  const _regenData = async (page: number) => {
    let result = await _getData('all', page);

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

  return (
    <>
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