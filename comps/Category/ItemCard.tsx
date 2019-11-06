import React, {useState, useEffect, useMemo} from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  Dimensions,
  Image
} from 'react-native';
import { Spinner } from 'native-base';

import TotalCategories from '../../configs/TotalCategories';

const {height, width} = Dimensions.get('window');

export interface GProps {
  screenProps: {state: any, dispatch: any}
};

export interface ItemCardProps extends GProps {
  item: any[],
  nowIndex: number,
  totalCount: number,
  showSpinner: boolean,
}
export interface ItemCardState {
  item: any,
  itemWidth: number,
  smallWidth: number,
  srcSmallHeight: number,
  smallScale: number,
  imgOnLoad: boolean
}

export default class _ItemCard extends React.PureComponent <ItemCardProps, ItemCardState> {
  private _mount: boolean = true;

  constructor(props: ItemCardProps) {
    super(props);

    this.state = {
      item: {},
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

      this.setState({
        item,
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

    return (
      <>
        <View
          style={{width: this.state.itemWidth, flexDirection: 'row', marginVertical: 5}}>
          <View
            style={{flex: 0.8, alignItems: 'center'}}>
            <Image
              style={{width: this.state.smallWidth, height: this.state.srcSmallHeight * this.state.smallScale}}
              source={{uri: imgStr}} />
          </View>
          <View
            style={{flex: 1, flexDirection: 'column'}}>
            <View
              style={{flex: 1, justifyContent: 'center', marginVertical: 5}}>
              <Text
                numberOfLines={2}
                style={{fontSize: 16}}>{this.state.item.title}</Text>
            </View>
            <View
              style={{flex: 0.5, flexDirection: 'row'}}>
              <View
                style={{flex: 1, justifyContent: 'center'}}>
                <Text
                  numberOfLines={1}
                  style={{fontSize: 14}}></Text>
              </View>
              <View
                style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}>
                <Text
                  numberOfLines={1}
                  style={{fontSize: 14}}>{this.state.item.post_date}</Text>
              </View>
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