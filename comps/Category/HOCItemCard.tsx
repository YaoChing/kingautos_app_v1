import React from 'react';
import {
  View,
  Text
} from 'react-native';

export interface GProps {
  screenProps: {state: any, dispatch: any}
};

export interface HOCItemCardProp extends GProps {}

export interface HOCItemCardState {
  ritem: any,
  rnowIndex: number,
  rtotalCount: number,
  rshowSpinner: boolean,
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

        switch(this.state.componentType) {
          case 'brand':
            breadcrumbTitle = '品牌 ' + this.state.title;
            break;
          case 'tag':
            breadcrumbTitle = '關鍵字 ' + this.state.title;
            break;
          case 'search':
            breadcrumbTitle = '搜尋 ' + this.state.title;
            break;
          default: 
            break;
        }

        if(breadcrumbTitle && this.state.rnowIndex === 0) {
          breadcrumbScope = (
            <View
              style={{flex: 0.05, paddingHorizontal: 5, marginHorizontal: 10, marginVertical: 10, backgroundColor: '', justifyContent: 'center', borderLeftColor: '#b71d29', borderLeftWidth: 8}}>
              <Text
                style={{fontSize: 16, color: '#b71d29'}}>{breadcrumbTitle}</Text>
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
        <WrappedComponent item={this.state.ritem} nowIndex={this.state.rnowIndex} totalCount={this.state.rtotalCount} showSpinner={this.state.rshowSpinner} renewName={''} {...this.props}/>
        </>
      );
    }
  }
}