import React, { useEffect, useMemo } from 'react';

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
      componentType: 'tag',
      title: props.screenProps.state.nowCate
    },
    () => {}
  )

  return <HOCComponent {...props}/>;
}