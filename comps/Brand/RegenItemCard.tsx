import React, { useEffect, useMemo } from 'react';
import {
  View,
  Text
} from 'react-native';

import ItemCard from '../Category/ItemCard';
import HOCItemCard from '../Category/HOCItemCard';

export interface GProps {
  screenProps: {state: any, dispatch: any}
};

export interface RegenItemCardProps extends GProps {
  ritem: any[],
  rnowIndex: number,
  rtotalCount: number,
  rshowSpinner: boolean,
}

export default (props: RegenItemCardProps) => {
  useEffect(() => {
    return () => {}
  }, []);

  useMemo(() => {}, []);

  let HOCComponent = HOCItemCard(
    ItemCard,
    {
      ritem: props.ritem,
      rnowIndex: props.rnowIndex,
      rtotalCount: props.rtotalCount,
      rshowSpinner: props.rshowSpinner,
      componentType: 'brand',
      title: props.screenProps.state.nowCate
    },
    () => {}
  )

  return <HOCComponent {...props}/>;

  return (
    <>
      {(props.rnowIndex === 0) ? (
        <View
          style={{flex: 0.05, paddingHorizontal: 5, marginHorizontal: 10, marginVertical: 10, backgroundColor: '', justifyContent: 'center', borderLeftColor: '#b71d29', borderLeftWidth: 8}}>
          <Text
            style={{fontSize: 16, color: '#b71d29'}}>品牌: {props.screenProps.state.nowCate}</Text>
        </View>
      ) : null}
      <ItemCard item={props.ritem} nowIndex={props.rnowIndex} totalCount={props.rtotalCount} showSpinner={props.rshowSpinner} renewName={''} {...props} />
    </>
  );
}