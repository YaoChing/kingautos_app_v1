import React, { useEffect, useMemo } from 'react';

import ItemCard from '../Category/ItemCard';
import HOCItemCard from '../Category/HOCItemCard';

import TotalCategories from '../../configs/TotalCategories';

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

  let nowCateName = '';
  let nowCateSlug = props.screenProps.state.nowCate;

  for(let key in TotalCategories) {
    let value = TotalCategories[key];

    if(value.slug === nowCateSlug) {
      nowCateName = value.name;
    }
  }

  let HOCComponent = HOCItemCard(
    ItemCard,
    {
      componentType: 'category',
      title: nowCateName
    },
    () => {}
  )

  return <HOCComponent {...props}/>;
}