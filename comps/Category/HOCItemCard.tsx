import React from 'react';
import {
  View,
  Text,
  Dimensions,
  Platform
} from 'react-native';

const {height, width} = Dimensions.get('window');

export interface GProps {
  screenProps: {state: any, dispatch: any},
  ritem: any,
  rnowIndex: number,
  rtotalCount: number,
  rshowSpinner: boolean
};

export interface HOCItemCardProp extends GProps {}

export interface HOCItemCardState {
  componentType: string,
  title: string,
  breadcrumbScope: any
}

export default (WrappedComponent: any, state: any, fn: () => void) => {
  return class extends React.PureComponent<HOCItemCardProp, HOCItemCardState> {
    private _isMount: boolean = true;

    constructor(props: HOCItemCardProp) {
      super(props);

      this.state = {
        ...state,
        breadcrumbScope: null
      };
    }

    componentDidMount() {
      if(this._isMount) {
        let breadcrumbScope = null;
        let breadcrumbTitle = '';
        let breadcrumbIdent = '';

        switch(this.state.componentType) {
          case 'category':
            breadcrumbIdent = '分類';
            breadcrumbTitle = this.state.title;
            break;
          case 'brand':
            breadcrumbIdent = '品牌';
            breadcrumbTitle = this.state.title;
            break;
          case 'tag':
            breadcrumbIdent = '關鍵字';
            breadcrumbTitle = this.state.title;
            break;
          case 'search':
            breadcrumbIdent = '搜尋';
            breadcrumbTitle = this.state.title;
            break;
          default: 
            break;
        }

        if(breadcrumbTitle && this.props.rnowIndex === 0) {
          breadcrumbScope = (
            <View
              style={{width, height: 35, flexDirection: 'row', padding: 5, marginHorizontal: 10, marginTop: 10, marginBottom: 5, alignItems: 'center', borderLeftColor: '#b71d29', borderLeftWidth: 8}}>
              <View
                style={{flex: (breadcrumbIdent.length < 3) ? 0.15 : 0.2}}>
                <Text
                  style={{fontSize: (Platform.OS === 'ios') ? 16 : 18, color: '#b71d29', fontStyle: 'italic'}}>{breadcrumbIdent}</Text>
              </View>
              <View
                style={{flex: 1}}>
                <Text
                  style={{fontSize: (Platform.OS === 'ios') ? 16 : 18, color: '#b71d29', fontWeight: 'bold'}}>{breadcrumbTitle}</Text>
              </View>
            </View>
          )
        }

        this.setState({
          breadcrumbScope
        });
      }
    }

    componentWillUnmount() {
      if(this._isMount) return false;
    }

    getSnapshotBeforeUpdate(prevProps: any, prevState: any) {
      return null;
    }
  
    componentDidUpdate(prevProps: any, prevState: any, snapshot: any) {
      if (snapshot !== null) {
        //
      }
    }

    render() {
      return (
        <>
        {this.state.breadcrumbScope}
        <WrappedComponent item={this.props.ritem} nowIndex={this.props.rnowIndex} totalCount={this.props.rtotalCount} showSpinner={this.props.rshowSpinner} {...this.props}/>
        </>
      );
    }
  }
}