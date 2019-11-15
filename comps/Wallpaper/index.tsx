import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  FlatList,
  TouchableHighlight,
  Platform
} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob'
import Icon from 'react-native-vector-icons/Entypo';
import {Spinner} from 'native-base';
import CameraRoll from "@react-native-community/cameraroll";

import {
  getWallpaperData
} from '../../libs/ConnectApi';
import { pageView } from '../../libs/Analytice';

import NotDataAlert from '../Category/NotDataAlert';
import Waiting from '../Category/Waiting';

let {height, width} = Dimensions.get('window');

export interface GProps {
  screenProps: {state: any, dispatch: any}
}

export interface ItemCardProps extends GProps {
  itemData: any,
  downloadFile: (name: string) => void
}

const ItemCard = (props: ItemCardProps) => {
  let item = props.itemData;
  let [showImage, setShowImage] = useState(false);

  useEffect(() => {
    return () => {}
  }, []);

  useMemo(() => {}, []);

  let srcWidth = 720;
  let srcHeight = 1280;
  let itemWidth = width / 3;
  let scaleNum = 1;

  if(srcWidth > itemWidth) {
    scaleNum = itemWidth / srcWidth;
  }
  
  return (
    <>
      <View
        style={{flex: 1}}>
        <View
          style={{width: itemWidth, height: srcHeight * scaleNum}}>
          <Image
            style={{width: '100%', height: '100%'}}
            source={{uri: 'https://images2.kingautos.net/wallpaper/uploads/' + item.filename}}
            onLoadEnd={() => setShowImage(true)}
            onError={() => setShowImage(false)} />
        </View>
        <View
          style={{position: 'absolute', right: 5, bottom: 60, width: 40, height: 40, borderRadius: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: '#222222', opacity: 0.7}}>
          <Icon name="share" size={22} color="#ffffff"/>
        </View>
        <TouchableHighlight
          underlayColor={'transparent'}
          onPress={() => {
            props.downloadFile(item.filename);
          }}
          style={{position: 'absolute', right: 5, bottom: 10, width: 40, height: 40}}
          >
          <View
            style={{flex: 1, borderRadius: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: '#222222', opacity: 0.7}}>
            <Icon name="download" size={22} color="#ffffff"/>
          </View>
        </TouchableHighlight>
        {(showImage) ? null : (
          <View style={{position: 'absolute', width: itemWidth, height: srcHeight * scaleNum, backgroundColor: '#c2c2c2', justifyContent: 'center', alignItems: 'center'}}>
            <Spinner color='#b71d29' />
          </View>
        )}
      </View>
    </>
  );
}

export interface WallpaperProps extends GProps {}

let _contentHeight = 0;
let _scrollViewHeight = 0;

export default (props: GProps) => {
  let [nowPage, setNowPage] = useState(1);
  let [cateData, setCateData] = useState<{data: {filename: string}[], totalPage: number}>({data: [], totalPage: 1});
  let [showTopBtn, setShowTopBtn] = useState(false);
  let [isNoData, setIsNoData] = useState(false);
  let [isSend, setIsSend] = useState(false);
  let [downloadStatus, setDownloadStatus] = useState('下載中...');
  let [showAlert, setShowAlert] = useState(false);

  const _regenData = async (page: number) => {
    if(isSend) return false;

    let result = await _getData(page);

    if(result.data.length <= 0) {
      setIsNoData(true);
    }
    
    setNowPage(page);
    pageView({name: 'Wallpaper', page});

    return result;
  }

  const _getData = async (page: number) => {
    let result: any = await getWallpaperData(page);

    return result;
  }

  const _downloadFile = (filename: string) => {
    setShowAlert(true);
    setDownloadStatus('下載中....');

    let dirs = RNFetchBlob.fs.dirs;
    let configs: any = {
      fileCache: true,
      path : dirs.DocumentDir + '/' + filename
    };

    if(Platform.OS === 'android') {
      configs = {
        fileCache: true,
        addAndroidDownloads : {
          useDownloadManager: true,
          notification : false,
          mime : 'image/jpg',
          description : '檔案處理中',
          mediaScannable: true,
          path : dirs.DownloadDir + '/' + filename,
        }
      }
    }

    RNFetchBlob
    .config(configs)
    .fetch('GET', 'https://images.kingautos.net/wallpaper/uploads/' + filename)
    .then((res) => {
      if(Platform.OS !== 'ios') {
        RNFetchBlob.android.actionViewIntent(res.path(), dirs.DownloadDir);

        setTimeout(() => setShowAlert(false), 500);
        setDownloadStatus('下載完畢');
      } else {
        CameraRoll.saveToCameraRoll(res.path())
          .then((res) => {
            setTimeout(() => setShowAlert(false), 500);
            setDownloadStatus('下載完畢');
          })
          .catch(err => console.log('err:', err));
      }
    })
    .catch((err) => {
      console.log(err);
    });
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
  
  return (
    <>
      <FlatList
        data={cateData.data}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        removeClippedSubviews={true}
        numColumns={3}
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
        renderItem={({item, index}) => {
          return (
            <ItemCard itemData={item} downloadFile={_downloadFile} {...props} />
          )
        }}
      />
      {(!showAlert) ? null : (
        <View
          style={{position: 'absolute' , width, height, justifyContent: 'center', alignItems: 'center'}}>
          <View
            style={{width, height, backgroundColor: '#222222', opacity: 0.5}} />
          <View
            style={{position: 'absolute', width: width * 0.75, height: 50, backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center', borderRadius: 10}}>
            <Text
              style={{color: '#222222', fontSize: (Platform.OS === 'ios') ? 16 : 18}}>{downloadStatus}</Text>
          </View>
        </View>
      )}
    </>
  )
}