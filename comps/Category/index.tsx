import React, {useState, useEffect, useMemo} from 'react';
import {
  View,
  FlatList
} from 'react-native';
import { Spinner } from 'native-base';

import {
  getCategoryData
} from '../../libs/ConnectApi';
import TotalCategories from '../../configs/TotalCategories';

import RegenItemCard from './RegenItemCard';

export interface GProps {
  screenProps: {state: any, dispatch: any}
};

let _contentHeight = 0;
let _scrollViewHeight = 0;

export default (props: GProps) => {
  let [nowPage, setNowPage] = useState(1);
  let [cateData, setCateData] = useState({id: 0, data: [], totalPage: 1});
  let [scrollViewHeight, setScrollViewHeight] = useState(0);

  const _regenData = async (page: number) => {
    let nowCateID = 1;
    let nowCateSlug = props.screenProps.state.nowCate;

    for(let key in TotalCategories) {
      let value = TotalCategories[key];

      if(value.slug === nowCateSlug) {
        nowCateID = value.id;
      }
    }

    let result = await _getData(nowCateID, page);
    
    setNowPage(page);

    return result;
  }

  const _getData = async (id: number, page: number) => {
    let result: any = await getCategoryData(id, page);

    return result;
  }

  useEffect(() => {
    return () => {}
  });

  useMemo(() => {
    (async () => {
      setCateData({id: 0, data: [], totalPage: 1});

      let result = await _regenData(1);

      result.data = cateData.data.concat(result.data);

      setCateData(result);
    })()
  }, [props.screenProps.state.nowCate]);

  if(cateData.data.length <= 0) {
    return (
      <View
        style={{flex: 1}}>
        <Spinner color='#b71d29' />
      </View>
    )
  }

  let _isSend = false;

  return (
    <FlatList
      style={{flex: 1}}
      data={cateData.data}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item, index) => index.toString()}
      removeClippedSubviews={true} 
      initialNumToRender={10}
      scrollEventThrottle={160}
      onContentSizeChange={(w, h) => {
        _contentHeight = h;
      }}
      onLayout={event => {
        _scrollViewHeight = event.nativeEvent.layout.height;
      }}
      onScroll={async (event) => { 
        let viewHeight = _contentHeight - _scrollViewHeight;

        if(Math.ceil(viewHeight - 10) <= event.nativeEvent.contentOffset.y) {
          if(_isSend) return false;

          let tempPage = nowPage + 1;

          if(tempPage > cateData.totalPage) {
            _isSend = true;
            return false;
          }

          let result = await _regenData(tempPage);

          result.data = cateData.data.concat(result.data);

          setCateData(result);

          _isSend = true;
        }
      }}
      ItemSeparatorComponent={() => {
        return (
          <View 
            style={{height: 1, backgroundColor: '#b8b8b8'}} />
        )
      }}
      renderItem={({item, index}) => {
        return <RegenItemCard ritem={item} rnowIndex={index} rtotalCount={cateData.data.length} rshowSpinner={nowPage < cateData.totalPage}  {...props} />
      }} />
  );
}