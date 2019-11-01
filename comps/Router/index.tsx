import React from 'react';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Main from '../Main';

const RootStatck = createStackNavigator({
  Main
}, {
  initialRouteName: "Main",
  defaultNavigationOptions: {
    header: null
  }
});

const RouterNavigator = createAppContainer(RootStatck);

export interface GProps {
  state: any,
  dispatch: any
};

export default (props: GProps) => {
  return <RouterNavigator screenProps={{state: props.state, dispatch: props.dispatch}} {...props} />;
}