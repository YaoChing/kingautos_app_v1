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

export default class extends React.PureComponent<RegenItemCardProps, {}> {
  constructor(props: RegenItemCardProps) {
    super(props);
  }

  render() {
    let nowCateName = '';
    let nowCateSlug = this.props.screenProps.state.nowCate;

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
  
    return <HOCComponent {...this.props}/>;
  }
}