import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk'; //thunk allows us to dispatch asynchronous actions
import createLogger from 'redux-logger';
import { createStore, applyMiddleware, compose } from 'redux';
import routes from './routes';
import rootReducer from './reducers/reducerCombined';
/*
 *1st param is rootReducer
 *this is a function that take state and action
 *and returns new state
 *2nd param in initial state
 *3rd param is applyMiddleware
*/
const logger = createLogger();
const createStoreWithMiddleware = applyMiddleware(thunk, logger)(createStore);
const store = createStoreWithMiddleware(rootReducer);
render(
  <Provider store={store}>
  <Router history={browserHistory} routes={routes}/>
  </Provider>, document.getElementById('app')
);
/*
   *redux give us actions
   *every time something happends in app
   *action is dispatched
   *components call functions
   *and pass data to them
   *without knowing what is going on
*/
