import React, {useEffect, useRef, useMemo} from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableHighlight,
  Animated,
  ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';

import Brands from '../../configs/Brands';
import Brand from 'comps/Brand';

const {height, width} = Dimensions.get('window');

export interface GProps {
  screenProps: {state: any, dispatch: any}
};

export interface _BrandSecondLevelItemProps extends GProps {
  secondLevelItem: any
}
export interface _BrandSecondLevelItemState {}

class _BrandSecondLevelItem extends React.PureComponent<_BrandSecondLevelItemProps, _BrandSecondLevelItemState> {
  private _isMount: boolean = true;

  constructor(props: _BrandSecondLevelItemProps) {
    super(props);

    this.state = {}
  }

  componentDidMount() {
    if(this._isMount) {}
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
    if(this._isMount) return false;
  }

  render() {
    let item: any = this.props.secondLevelItem;
    let nowCate = this.props.screenProps.state.nowCate;

    return (
      <TouchableHighlight
        underlayColor={'transparent'}
        onPress={() => {
          this.props.screenProps.dispatch({type: 'SetBrandFromSideBrand', data: item.name});
        }} 
        style={{width: width * 0.58, height: 55}}>
        <View
          style={{width:　width * 0.8 * 0.8 - 20, height: 55, paddingHorizontal: 20, justifyContent: 'center',backgroundColor: (nowCate !== item.name) ? '#ffffff' : '#b71d29'}}>
          <Text
            style={{fontSize: 18, color: (nowCate !== item.name) ? '#222222' : '#ffffff'}}>{item.name}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

export interface _BrandSecondLevelDataProps extends GProps {
  secondLevelData: any,
  isShowSubItem: boolean
}

const _BrandSecondLevelData = (props: _BrandSecondLevelDataProps) => {
  if(!props.isShowSubItem || props.secondLevelData.length <= 0) return null;

  return (
    <ScrollView
      removeClippedSubviews={true} >
      {props.secondLevelData.map((value: any, index: number) => {
        return <_BrandSecondLevelItem secondLevelItem={value} {...props} />;
      })}
    </ScrollView>
  );
}

export interface _BrandFirstLevelItemProps extends GProps {
  firstLevelItem: any,
  findex: number
}
export interface _BrandFirstLevelItemState {
  isShowSubItem: boolean,
  subView: any
}

class _BrandFirstLevelItem extends React.PureComponent<_BrandFirstLevelItemProps, _BrandFirstLevelItemState> {
  private _isMount: boolean = true;

  constructor(props: _BrandFirstLevelItemProps) {
    super(props);

    this.state = {
      isShowSubItem: false,
      subView: new Animated.Value(0)
    }
  }

  componentDidMount() {
    if(this._isMount) {}
  }

  getSnapshotBeforeUpdate(prevProps: any, prevState: any) {
    if(!this.props.screenProps.state.isShowSideBrand && this.state.isShowSubItem) return 'closeItems'; 

    return null;
  }

  componentDidUpdate(prevProps: any, prevState: any, snapshot: any) {
    if (snapshot !== null) {
      if(snapshot === 'closeItems') {
        this.setState({isShowSubItem: false}, () => this._hideMenu());
      }
    }
  }

  componentWillUnmount() {
    if(this._isMount) return false;
  }

  setIsShowSubItem(status: boolean) {
    this.setState({isShowSubItem: status})

    if(status) {
      this._showMenu();
    } else {
      this._hideMenu();
    }
  }

  _showMenu() {
    Animated.timing(
      this.state.subView,
      {
        toValue: 55 * this.props.firstLevelItem.subs.length,
        duration: 200
      }
    ).start();
  }

  _hideMenu() {
    Animated.timing(
      this.state.subView,
      {
        toValue: 0,
        duration: 0
      }
    ).start();
  }

  render() {
    let item = this.props.firstLevelItem;

    return (
      <>
        <View
          style={{flex: 1, flexDirection: 'row', alignItems: 'center', borderTopColor: '#c2c2c2', borderTopWidth: (this.props.findex > 0) ? 1 : 0}}>
          <TouchableHighlight
            underlayColor="transparent"
            onPress={() => {
              this.setIsShowSubItem(!this.state.isShowSubItem);
            }}
            style={{width: width * 0.58, height: 55}}>
            <View
              style={{flex: 1, justifyContent: 'center', paddingLeft: 5}}>
              <Text
                style={{fontSize: 18}}>{item.name}</Text>
            </View>
          </TouchableHighlight>
          {(item.subs.length > 0) ? (
            <TouchableHighlight
              underlayColor={'transparent'}
              onPress={() => this.setIsShowSubItem(!this.state.isShowSubItem)}
              style={{width: width * 0.2, height: 55}} >
              <View
                style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Icon name={(this.state.isShowSubItem) ? "chevron-up" : "chevron-down"} size={40} color="#222222" />
              </View>
            </TouchableHighlight>
          ) : null}
        </View>
        {(item.subs.length > 0) ? (
          <Animated.View
            style={{height: this.state.subView}}>
            <_BrandSecondLevelData isShowSubItem={this.state.isShowSubItem} secondLevelData={item.subs} {...this.props} />
          </Animated.View>
        ) : null}
      </>
    );
  }
}

export default (props: GProps) => {
  let scrollViewRef = useRef<ScrollView>(null);

  const _switchShow = () => {
    props.screenProps.dispatch({
      type: 'SetIsShowSideBrand', 
      data: !props.screenProps.state.isShowSideBrand
    });
  }

  useEffect(() => {
    return () => {}
  });

  useMemo(() => {
    if(props.screenProps.state.isShowSideBrand) scrollViewRef.current!.scrollTo({x: 0, y: 0, animated: true});
  }, [props.screenProps.state.isShowSideBrand]);

  return (
    <View
      style={{flex: 1, alignItems: 'flex-end'}}>
      {/* 背景 */}
      <TouchableHighlight
        underlayColor="transparent"
        onPress={() => _switchShow()}
        style={{position:'absolute', width, height}}>
        <View
          style={{width, height, backgroundColor: '#222222', opacity: 0.8}} />
      </TouchableHighlight>
      {/* 側邊選單總區塊 */}
      <View
        style={{width: width * 0.8, height, flexDirection: 'column', backgroundColor: '#ffffff'}}>
        {/* 關閉按鈕 */}
        <TouchableHighlight
          underlayColor="transparent"
          onPress={() => _switchShow()}
          style={{width: width * 0.8, height: 70, alignItems: 'flex-start', justifyContent: 'center'}}>
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center', padding: 5}}>
            <Icon name="close" size={35} color="#222222" />
            <Text
              style={{color: '#c2c2c2', fontSize: 10}}>關閉</Text>
          </View>
        </TouchableHighlight>
        <ScrollView
          ref={scrollViewRef}
          removeClippedSubviews={true}
          style={{flex: 1, paddingHorizontal: 10, marginBottom: 30}}>
          {Brands.map((value, index) => {
            return <_BrandFirstLevelItem firstLevelItem={value} findex={index} {...props} />;
          })}
        </ScrollView>
      </View>
    </View>
  );
}