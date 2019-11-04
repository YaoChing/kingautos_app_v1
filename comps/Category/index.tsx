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

import ItemCard from './ItemCard';


export interface GProps {
  screenProps: {state: any, dispatch: any}
};

export default (props: GProps) => {
  let [nowPage, setNowPage] = useState(1);
  let [cateData, setCateData] = useState({id: 0, data: [], totalPage: 1});

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
  }, []);

  useMemo(() => {
    (async () => {
      setCateData({id: 0, data: [], totalPage: 1});

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
        return <ItemCard item={item} nowIndex={index} totalCount={cateData.data.length} showSpinner={nowPage < cateData.totalPage} {...props} />;
      }}
      />
  );
}