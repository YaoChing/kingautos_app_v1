import React, {useEffect, useMemo, useState} from 'react';
import {
  View
} from 'react-native';

import Header from '../Header';
import Footer from '../Footer';
import Category from '../Category';
import Brand from '../Brand';
import Tag from '../Tag';
import ConnectUs from '../ConnectUs';
import Search from '../Search';
import Fqa from '../Fqa';
import Wallpaper from '../Wallpaper';

export interface GProps {
  screenProps: {state: any, dispatch: any},
  navigation: any
};

export default (props: GProps) => {
  let [nowScope, setNowScope] = useState(<View style={{flex: 1}} />);

  useEffect(() => {
    return () => {}
  });

  useMemo(() => {
    let scope: any = null;

    switch(props.screenProps.state.nowArea) {
      case 'brandArea':
        scope = <Brand {...props} />;
        break;
      case 'tagArea':
        scope = <Tag {...props} />;
        break;
      case 'categoryArea':
        scope = <Category {...props} />;
        break;
      case 'connectusArea':
        scope = <ConnectUs {...props} />;
        break;
      case 'searchArea':
        scope = <Search {...props} />;
        break;
      case 'fqaArea':
        scope = <Fqa {...props} />;
        break;
      case 'wallpaperArea':
        scope = <Wallpaper {...props} />;
        break;
      default: 
        scope = <View style={{flex: 1}} />;
        break;
    }

    setNowScope(scope);
  }, [props.screenProps.state.nowCate]);

  return (
    <>
      <Header {...props} />
      {nowScope}
      <Footer {...props} />
    </>
  );
}