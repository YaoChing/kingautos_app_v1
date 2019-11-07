import React, {useEffect, useMemo, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableHighlight,
  Dimensions
} from 'react-native';

import {
  getHotKeywords
} from '../../libs/ConnectApi';

const {height, width} = Dimensions.get('window');

export interface GProps {
  screenProps: {state: any, dispatch: any}
};

export interface ItemCardProps extends GProps {
  keywordsItem: string
}
export interface ItemCardState {}

class _ItemCard extends React.PureComponent <ItemCardProps, ItemCardState> {
  private _mount: boolean = true;

  constructor(props: ItemCardProps) {
    super(props);
  }

  componentDidMount() {
    if(this._mount) {
      //
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
    let item = this.props.keywordsItem;

    return (
      <TouchableHighlight
        underlayColor={'transparent'}
        onPress={() => this.props.screenProps.dispatch({type: 'SetCateFromSearch', data: item})} >
        <View
          style={{paddingHorizontal: 20, paddingVertical: 15, justifyContent: 'center'}}>
          <Text
            style={{fontSize: 16}}>{item}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

const _getHotKeywords = async () => {
  let totalPage = 1;
  let data = [];
  let result: any = await getHotKeywords();

  return result;
}

export default (props: GProps) => {
  let [keywords, setKeywords] = useState<string[]>(["處理中...."]);

  useEffect(() => {
    return () => {}
  });

  useMemo(() => {
    setKeywords([""]);

    (async () => {
      if(!props.screenProps.state.isShowSearch) return false;

      let result = await _getHotKeywords();

      let reNewTemp = result.data.sort((a:any, b:any) => {
        return 0.5 - Math.random();
      });

      setKeywords(reNewTemp);
    })();
  }, [props.screenProps.state.isShowSearch]);

  return (
    <View
      style={{flex: 1, backgroundColor: '#ffffff'}}>
      <FlatList
        style={{flex: 1, paddingHorizontal: 20, marginTop: 10, marginBottom: 30}}
        data={keywords}
        initialNumToRender={16}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={true}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={() => {
          return (
            <View 
              style={{width, height: 1, backgroundColor: '#b8b8b8'}} />
          )
        }}
        renderItem={({item, index}) => <_ItemCard keywordsItem={item} {...props} />}
      />
    </View>
  );
}