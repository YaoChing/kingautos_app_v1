import React, {useReducer} from 'react';
import {
  StatusBar
} from 'react-native';

import Router from './comps/Router';

import {initState, initFunction} from './libs/Reducer'

export interface GProps {}

export default (props: GProps) => {
  const [state, dispatch] = useReducer(initFunction, initState);

  return (
    <>
      <StatusBar barStyle="light-content" />
      <Router state={state} dispatch={dispatch} />
    </>
  );
};
