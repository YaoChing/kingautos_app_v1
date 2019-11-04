import React, {useState, useEffect, useMemo} from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  Dimensions,
  FlatList,
  Image
} from 'react-native';
import { Spinner } from 'native-base';

import {
  getCategoryData
} from '../../libs/ConnectApi';
import TotalCategories from '../../configs/TotalCategories';

const {height, width} = Dimensions.get('window');

export interface GProps {
  screenProps: {state: any, dispatch: any}
};

export interface ItemCardProps extends GProps {
  item: any[],
  nowIndex: number,
  totalCount: number,
  showSpinner: boolean
}
export interface ItemCardState {
  item: any,
  nowCateName: string,
  itemWidth: number,
  smallWidth: number,
  srcSmallHeight: number,
  smallScale: number,
  imgOnLoad: boolean
}

class _ItemCard extends React.PureComponent <ItemCardProps, ItemCardState> {
  private _mount: boolean = true;

  constructor(props: ItemCardProps) {
    super(props);

    this.state = {
      item: {},
      nowCateName: '',
      itemWidth: 0,
      smallWidth: 0,
      srcSmallHeight: 0,
      smallScale: 0,
      imgOnLoad: true
    }
  }

  componentDidMount() {
    if(this._mount) {
      let item = this.props.item;
      let srcWidth = 475;
      let srcSmallWidth = 475;
      let srcSmallHeight = 330;
      let imgScale = 1;

      if(width < srcWidth) {
        imgScale = (width - 20) / srcWidth;
      }

      let itemWidth = Math.ceil(srcWidth * imgScale);
      let smallWidth = itemWidth * 0.4;
      let smallScale = smallWidth / srcSmallWidth;
      let nowCateName = '';
      let nowCateSlug = this.props.screenProps.state.nowCate;

      for(let key in TotalCategories) {
        let value = TotalCategories[key];

        if(value.slug === nowCateSlug) {
          nowCateName = value.name;
        }
      }

      this.setState({
        item,
        nowCateName,
        itemWidth,
        smallWidth,
        srcSmallHeight,
        smallScale
      })
    }
  }

  getSnapshotBeforeUpdate(prevProps: any, prevState: any) {
    return null;
  }

  componentDidUpdate(prevProps: any, prevState: any, snapshot: any) {
    if (snapshot !== null) {
      //
    }
  }

  componentWillUnmount() {
    if(this._mount) {
      return false;
    }
  }

  render() {
    if(Object.keys(this.props.item).length <= 0) return null;
    if(!this.state.item.imgStr) return null;

    let regData = this.state.item.imgStr.match(/\.jpe?g/);
    let imgStr = (regData) ? this.state.item.imgStr.replace(regData[0], '-475x330' + regData[0]) : this.state.item.imgStr;
    let icon = this.state.imgOnLoad ? require('../../files/prepare.jpg') : {uri: imgStr};

    return (
      <>
        <View
          style={{width: this.state.itemWidth, flexDirection: 'row', marginVertical: 5}}>
          <View
            style={{flex: 0.8, alignItems: 'center'}}>
            <Image
              style={{width: this.state.smallWidth, height: this.state.srcSmallHeight * this.state.smallScale}}
              source={icon} 
              onLoadEnd={() => this.setState({imgOnLoad: false})}
              resizeMode='contain' />
          </View>
          <View
            style={{flex: 1, flexDirection: 'column'}}>
            <View
              style={{flex: 0.5, justifyContent: 'center'}}>
              <Text
                numberOfLines={1}
                style={{fontSize: 16}}>{this.state.nowCateName}</Text>
            </View>
            <View
              style={{flex: 1, justifyContent: 'center', marginVertical: 5}}>
              <Text
                numberOfLines={2}
                style={{fontSize: 19}}>{this.state.item.title}</Text>
            </View>
            <View
              style={{flex: 0.5, justifyContent: 'center'}}>
              <Text
                numberOfLines={1}
                style={{fontSize: 16}}>{this.state.item.post_date}</Text>
            </View>
          </View>
        </View>
        {(this.props.showSpinner && this.props.nowIndex === (this.props.totalCount - 1)) ? (
          <View
            style={{width, height: Math.ceil(height * 0.085), justifyContent: 'center', alignItems: 'center'}}>
            <Spinner color='#b71d29' />
          </View>
        ) : null}
      </>
    );
  }
}

export default (props: GProps) => {
  let [nowPage, setNowPage] = useState(1);
  let [cateData, setCateData] = useState({id: 0, data: [], totalPage: 1});

  const _regenData = async (page: number) => {
    let nowCateID = 1;
    let nowCateName = '';
    let nowCateSlug = props.screenProps.state.nowCate;

    for(let key in TotalCategories) {
      let value = TotalCategories[key];

      if(value.slug === nowCateSlug) {
        nowCateID = value.id;
        nowCateName = value.name;
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
        return <_ItemCard item={item} nowIndex={index} totalCount={cateData.data.length} showSpinner={nowPage < cateData.totalPage} {...props} />;
      }}
      />
  );
}