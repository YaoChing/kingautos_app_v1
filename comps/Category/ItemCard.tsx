import React, {useState, useEffect, useMemo} from 'react';
import {
  View,
  Text,
  Dimensions,
  Image,
  Platform
} from 'react-native';
import { Spinner } from 'native-base';


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
          style={{width: width - 10, height: this.state.srcSmallHeight * this.state.smallScale, flexDirection: 'row', margin: 5}}>
          <Image
            style={{width: this.state.smallWidth, height: this.state.srcSmallHeight * this.state.smallScale}}
            source={(this.state.imgOnLoad) ? {uri: imgStr} : require('../../files/prepare.jpg')}
            onError={() => this.setState({imgOnLoad: false})} />
          <View
            style={{flex: 1, flexDirection: 'column'}}>
            <View
              style={{flex: 1, paddingHorizontal: 10}}>
              <Text
                numberOfLines={3}
                style={{fontSize: (Platform.OS === 'ios') ? 16 : 18, lineHeight: (Platform.OS === 'ios') ? 26 : 28}}>{this.state.item.title}</Text>
            </View>
            <View
              style={{flex: 0.2, flexDirection: 'row', paddingHorizontal: 10}}>
              <View
                style={{flex: 1, justifyContent: 'center'}}>
                <Text
                  numberOfLines={1}
                  style={{fontSize: (Platform.OS === 'ios') ? 13 : 15}}></Text>
              </View>
              <View
                style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}>
                <Text
                  numberOfLines={1}
                  style={{fontSize: (Platform.OS === 'ios') ? 13 : 15}}>{this.state.item.post_date}</Text>
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