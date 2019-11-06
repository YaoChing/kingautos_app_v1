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

export default class extends React.PureComponent<RegenItemCardProps, {}> {
  constructor(props: RegenItemCardProps) {
    super(props);
  }

  render() {
    let HOCComponent = HOCItemCard(
      ItemCard,
      {
        componentType: 'brand',
        title: this.props.screenProps.state.nowCate
      },
      () => {}
    )
  
    return <HOCComponent {...this.props}/>;
  }
}