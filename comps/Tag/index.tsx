import React, {useEffect, useMemo, useState} from 'react';
import {
  View,
  FlatList
} from 'react-native';
import { Spinner } from 'native-base';

import {
  getTagData
} from '../../libs/ConnectApi';

import RegenItemCard from './RegenItemCard';

export interface GProps {
  screenProps: {state: any, dispatch: any}
};

export default (props: GProps) => {
  let [nowPage, setNowPage] = useState(1);
  let [cateData, setCateData] = useState({data: [], totalPage: 1});

  const _regenData = async (page: number) => {
    let nowCateSlug = props.screenProps.state.nowCate;
    let result = await _getData(nowCateSlug, page);
    
    setNowPage(page);

    return result;
  }

  const _getData = async (name: string, page: number) => {
    let result: any = await getTagData(name, page);

    return result;
  }

  useEffect(() => {
    return () => {}
  }, []);

  useMemo(() => {
    (async () => {
      setCateData({data: [], totalPage: 1});

      let result = await _regenData(1);

      cateData.data = cateData.data.concat(result.data);

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

  return (
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
        return <RegenItemCard ritem={item} rnowIndex={index} rtotalCount={cateData.data.length} rshowSpinner={nowPage < cateData.totalPage}  {...props} />
      }} />
  );
}