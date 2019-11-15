import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  View,
  FlatList,
  Text,
  Dimensions,
  TouchableHighlight,
  Animated,
  Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { pageView } from '../../libs/Analytice';

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

let _contentHeight = 0;
let _scrollViewHeight = 0;

export default (props: FqaProps) => {
  let [nowPage, setNowPage] = useState(1);
  let [cateData, setCateData] = useState({data: [], totalPage: 1});
  let [showTopBtn, setShowTopBtn] = useState(false);
  let [isNoData, setIsNoData] = useState(false);
  let [nowTab, setNowTab] = useState('all');
  let [nowTabName, setNowTabName] = useState('最新問答');
  let [isShowTabList, setIsShowTabList] = useState(new Animated.ValueXY({x: 0, y: height}));
  let flatListRef = useRef<FlatList<null>>(null);
  let [isSend, setIsSend] = useState(false);
  
  const _regenData = async (page: number) => {
    if(isSend) return false;

    let result = await _getData(nowTab, page);

    if(result.data.length <= 0) {
      setIsNoData(true);
    }
    
    setNowPage(page);
    pageView({name: '買車請借問_' + nowTab, page});

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
      setShowTopBtn(false);
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

  let tabs = [{
    name: '最新問答',
    slug: 'all'
  }, {
    name: '熱門問答',
    slug: 'hotrank'
  }, {
    name: '品牌車系',
    slug: '品牌車系'
  }, {
    name: '新車選購',
    slug: '新車選購'
  }];

  const goToTop = () => {
    flatListRef.current!.scrollToOffset({ animated: true, offset: 0 });
  }

  const onValueChange = async (value: string) => {
    if(isNoData) setIsNoData(false);

    setCateData({data: [], totalPage: 1});

    let result = await _getData(value, 1);

    setCateData(result);
    setNowTab(value);
    setShowTopBtn(false);
  }

  const _showSelectTab = () => {
    Animated.timing(
      isShowTabList,
      {
        toValue: {x: 0, y: 0},
        duration: 100,
        useNativeDriver: true
      }
    ).start();
  }

  const _hideSelectTab = () => {
    Animated.timing(
      isShowTabList,
      {
        toValue: {x: 0, y: height},
        duration: 0,
        useNativeDriver: true
      }
    ).start();
  }

  return (
    <>
      <TouchableHighlight
        underlayColor={'transparent'}
        onPress={() => {
          _showSelectTab();
        }} >
        <View
          style={{width, height: 35, flexDirection: 'row', borderLeftColor: '#b71d29', borderLeftWidth: 8, padding: 5, margin: 10, alignItems: 'center'}}>
          <View
            style={{flex: 1}}>
            <Text
              style={{fontSize: (Platform.OS === 'ios') ? 16 : 18, fontWeight: 'bold', fontStyle: 'italic'}}>{nowTabName}</Text>
          </View>
          <View
            style={{flex: 0.2, alignItems: 'flex-end', paddingRight: 30}}>
            <Icon name="caretdown" />
          </View>
        </View>
      </TouchableHighlight>
      <FlatList
        scrollEnabled={!isSend}
        ref={flatListRef}
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
          return <ItemCard fqaData={item} rnowIndex={index} rtotalCount={cateData.data.length} rshowSpinner={nowPage < cateData.totalPage} {...props} />
        }} />
      {(showTopBtn) ? <GoToTop goToTop={goToTop} /> : null}
      <Animated.View
        style={{
          position: 'absolute', 
          width, 
          height, 
          transform: [{translateY: isShowTabList.y}],
          zIndex: 999
        }}>
        <View
          style={{position: 'absolute', top: 0, left: 0, justifyContent: 'center', alignItems: 'center'}}>
          <TouchableHighlight
            underlayColor={'transparent'}
            onPress={() => {
              _hideSelectTab();
            }}
            style={{width, height}} >
            <View
              style={{flex: 1, backgroundColor: '#222222', opacity: 0.8}} />
          </TouchableHighlight>
          <View
            style={{position: 'absolute', width: 300, height: 240}}>
            <FlatList
              scrollEnabled={false}
              style={{flex: 1, backgroundColor: '#ffffff', borderRadius: 10}}
              data={tabs}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              removeClippedSubviews={Platform.OS !== 'ios'} 
              ItemSeparatorComponent={() => {
                return (
                  <View 
                    style={{height: 1, backgroundColor: '#b8b8b8'}} />
                )
              }}
              renderItem={({item, index}) => {
                return (
                  <TouchableHighlight
                    underlayColor={'transparent'}
                    onPress={() => {
                      onValueChange(item.slug);
                      setNowTabName(item.name);
                      setShowTopBtn(false);
                      _hideSelectTab();
                    }}
                    style={{height: 60}} >
                    <View
                      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                      <Text
                        style={{fontSize: (Platform.OS === 'ios') ? 16 : 18, fontWeight: 'bold'}}>{item.name}</Text>
                    </View>
                  </TouchableHighlight>
                );
              }} />
          </View>
        </View>
      </Animated.View>
    </>
  );
}