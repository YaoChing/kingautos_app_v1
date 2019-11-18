import React, {useEffect, useMemo, useState} from 'react';
import {
  View,
  FlatList,
  RefreshControl
} from 'react-native';

import {
  getTagData
} from '../../libs/ConnectApi';
import { pageView } from '../../libs/Analytice';

import RegenItemCard from './RegenItemCard';
import GoToTop from '../Category/GotoTop';
import NotDataAlert from '../Category/NotDataAlert';
import Waiting from '../Category/Waiting';

export interface GProps {
  screenProps: {state: any, dispatch: any}
};

let _contentHeight = 0;
let _scrollViewHeight = 0;

export default (props: GProps) => {
  let [nowPage, setNowPage] = useState(1);
  let [cateData, setCateData] = useState({data: [], totalPage: 1});
  let [showTopBtn, setShowTopBtn] = useState(false);
  let [isNoData, setIsNoData] = useState(false);
  let [isSend, setIsSend] = useState(false);
  let [refreshing, setRefreshing] = React.useState(false);

  const _regenData = async (page: number) => {
    if(isSend) return false;

    let nowCateSlug = props.screenProps.state.nowCate;
    let result = await _getData(nowCateSlug, page);

    if(result.data.length <= 0) {
      setIsNoData(true);
    }
    
    setNowPage(page);
    pageView({name: '關鍵字_' + nowCateSlug, page});

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
      if(isNoData) setIsNoData(false);

      setCateData({data: [], totalPage: 1});

      let result = await _regenData(1);

      setCateData(result);
      setShowTopBtn(false);
    })()
  }, [props.screenProps.state.nowCate]);

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

  const goToTop = () => {
    _ref.scrollToOffset({ animated: true, offset: 0 });
  }

  return (
    <>
      <FlatList
        scrollEnabled={!isSend}
        ref={(c) => _ref = c}
        style={{flex: 1}}
        data={cateData.data}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        removeClippedSubviews={true} 
        initialNumToRender={10}
        scrollEventThrottle={160}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={async () => {
            setCateData({data: [], totalPage: 1});

            let result = await _regenData(1);

            setCateData(result);
            setShowTopBtn(false);
          }} />
        }
        onContentSizeChange={(w, h) => {
          _contentHeight = h;
        }}
        onLayout={event => {
          _scrollViewHeight = event.nativeEvent.layout.height;
        }}
        onScroll={async (event) => { 
          let viewHeight = _contentHeight - _scrollViewHeight;
          let nowScollPos = event.nativeEvent.contentOffset.y;

          if(nowScollPos > 100 && !showTopBtn) {
            setShowTopBtn(!showTopBtn);
          } else if(nowScollPos < 100 && showTopBtn) {
            setShowTopBtn(!showTopBtn);
          }

          if(Math.ceil(viewHeight - 10) <= nowScollPos) {
            if(isSend) return false;

            setIsSend(true);

            let tempPage = nowPage + 1;

            if(tempPage > cateData.totalPage) {
              setIsSend(false);
              return false;
            }

            if(isNoData) setIsNoData(false);

            let result = await _regenData(tempPage);

            result.data = cateData.data.concat(result.data);

            setCateData(result);

            setTimeout(() => setIsSend(false), 100);
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
      {(showTopBtn) ? <GoToTop goToTop={goToTop} /> : null}
    </>
  );
}