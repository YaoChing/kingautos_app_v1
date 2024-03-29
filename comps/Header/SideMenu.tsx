import React, {useEffect} from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableHighlight,
  FlatList,
  Animated
} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';

import Categories from '../../configs/Categories';

const {height, width} = Dimensions.get('window');

export interface GProps {
  screenProps: {state: any, dispatch: any}
};

export interface _CategorySecondLevelItemProps extends GProps {
  secondLevelItem: any
}
export interface _CategorySecondLevelItemState {}

class _CategorySecondLevelItem extends React.PureComponent<_CategorySecondLevelItemProps, _CategorySecondLevelItemState> {
  private _isMount: boolean = true;

  constructor(props: _CategorySecondLevelItemProps) {
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
          this.props.screenProps.dispatch({type: 'SetCateFromSideMenu', data: item.slug});
        }} 
        style={{flex: 0, height: 50}}>
        <View
          style={{width:　width * 0.8 * 0.8 - 20, paddingHorizontal: 20, paddingVertical: 10, backgroundColor: (nowCate !== item.slug) ? '#ffffff' : '#b71d29'}}>
          <Text
            style={{fontSize: 16, color: (nowCate !== item.slug) ? '#222222' : '#ffffff'}}>{item.name}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

export interface _CategorySecondLevelDataProps extends GProps {
  secondLevelData: any
}

const _CategorySecondLevelData = (props: _CategorySecondLevelDataProps) => {
  if(!props.screenProps.state.isShowSideMenu) return null;
  if(props.secondLevelData.length <= 0) return null;

  return (
    <FlatList
      data={props.secondLevelData}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item, index}) => {
        return <_CategorySecondLevelItem secondLevelItem={item} {...props} />;
      }} />
  );
}


export interface _CategoryFirstLevelItemProps extends GProps {
  firstLevelItem: any
}
export interface _CategoryFirstLevelItemState {
  isShowSubItem: boolean,
  subView: any
}

class _CategoryFirstLevelItem extends React.PureComponent<_CategoryFirstLevelItemProps, _CategoryFirstLevelItemState> {
  private _isMount: boolean = true;

  constructor(props: _CategoryFirstLevelItemProps) {
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
        toValue: 50 * this.props.firstLevelItem.subs.length,
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
    if(!this.props.screenProps.state.isShowSideMenu) return null;
    
    let item = this.props.firstLevelItem;
    let nowCate = this.props.screenProps.state.nowCate;

    return (
      <>
        <View
          style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
          <TouchableHighlight
            underlayColor="transparent"
            onPress={() => {
              this.props.screenProps.dispatch({type: 'SetCateFromSideMenu', data: item.slug});
            }}
            style={{flex: 0.8}}>
            <View
              style={{flex: 1, justifyContent: 'center', paddingVertical: 15, paddingLeft: 5, backgroundColor: (nowCate !== item.slug) ? '#ffffff' : '#b71d29'}}>
              <Text
                style={{fontSize: 16, color: (nowCate !== item.slug) ? '#222222' : '#ffffff'}}>{item.name}</Text>
            </View>
          </TouchableHighlight>
          {(item.subs.length > 0) ? (
            <TouchableHighlight
              underlayColor={'transparent'}
              onPress={() => this.setIsShowSubItem(!this.state.isShowSubItem)}
              style={{flex: 0.2}} >
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
            <_CategorySecondLevelData secondLevelData={item.subs} {...this.props} />
          </Animated.View>
        ) : null}
      </>
    );
  }
}

export interface _CategoryScopeProps extends GProps {}

const _CategoryScope = (props: _CategoryScopeProps) => {
  let categoriesData = [];

  for(let key in Categories) {
    let value = Categories[key];

    if(value.screenArea !== 'member' && value.screenArea !== 'connectus') {
      categoriesData.push(value);
    }
  }

  return (
    <FlatList
      data={categoriesData}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item, index) => index.toString()}
      extraData={categoriesData}
      ItemSeparatorComponent={() => {
        return (
          <View 
            style={{width: Math.ceil(width * 0.8), height: 1, backgroundColor: '#b8b8b8'}} />
        )
      }}
      renderItem={({item, index}) => {
        return <_CategoryFirstLevelItem firstLevelItem={item} {...props} />;
      }}
    />
  )
}

export default (props: GProps) => {
  const _switchShow = () => {
    props.screenProps.dispatch({
      type: 'SetIsShowSideMenu', 
      data: !props.screenProps.state.isShowSideMenu
    });
  }

  useEffect(() => {
    return () => {}
  });

  return (
    <>
      <TouchableHighlight
        underlayColor="transparent"
        onPress={() => _switchShow()}
        style={{position:'absolute', width, height}}>
        <View
          style={{width, height, backgroundColor: '#222222', opacity: 0.8}} />
      </TouchableHighlight>
      <View
        style={{width: width * 0.8, height, flexDirection: 'column', backgroundColor: '#ffffff'}}>
        {/* 關閉按鈕 */}
        <TouchableHighlight
          underlayColor="transparent"
          onPress={() => _switchShow()}
          style={{flex: 0.1, alignItems: 'flex-end', justifyContent: 'center'}}>
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center', padding: 5}}>
            <Icon name="close" size={35} color="#222222" />
            <Text
              style={{color: '#c2c2c2', fontSize: 10}}>關閉</Text>
          </View>
        </TouchableHighlight>
        <FlatList
          style={{flex: 1, paddingHorizontal: 10, marginBottom: 30}}
          data={[1]}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          initialNumToRender={1}
          renderItem={({item, index}) => {
            return (
              <>
                <View
                  style={{flex: 0, flexDirection: 'row', alignItems: 'center', paddingVertical: 15}}>
                  <Icon name="user" size={45} color="#222222" />
                  <Text
                    style={{fontSize: 18}}>會員登入</Text>
                </View>
                <_CategoryScope {...props}/>
                <View 
                  style={{width: Math.ceil(width * 0.8), height: 1, backgroundColor: '#b8b8b8'}} />
                <View
                  style={{flex: 0, flexDirection: 'row', paddingVertical: 15, paddingLeft: 5, borderBottomColor: '#b8b8b8', borderBottomWidth: 1}}>
                  <View
                    style={{flex: 1, justifyContent: 'center'}}>
                    <Text
                    style={{fontSize: 16}}>會員專區</Text>
                  </View>
                  <View
                    style={{flex: 0.2, justifyContent: 'center', alignItems: 'center'}}>
                    <Text
                      style={{fontSize: 16}}>登入</Text>
                  </View>
                </View>
                <TouchableHighlight
                  underlayColor="transparent"
                  onPress={() => props.screenProps.dispatch({type: 'SetAreaFromSideMenu', data: 'connectus'})}
                  style={{flex: 1, justifyContent: 'center', paddingVertical: 15, paddingLeft: 5, backgroundColor: (props.screenProps.state.nowCate !== 'connectus') ? '#ffffff' : '#b71d29'}}>
                  <Text
                    style={{fontSize: 16, color: (props.screenProps.state.nowCate !== 'connectus') ? '#222222' : '#ffffff'}}>聯絡我們</Text>
                </TouchableHighlight>
              </>
            );
          }}
        />
      </View>
    </>
  );
}