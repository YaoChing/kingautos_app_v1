import React, {useReducer} from 'react';

import Router from './comps/Router';

import {initState, initFunction} from './libs/Reducer'

export interface GProps {}

export default (props: GProps) => {
  const [state, dispatch] = useReducer(initFunction, initState);

  return <Router state={state} dispatch={dispatch} />;
};
