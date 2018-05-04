import { createStore, applyMiddleware } from 'redux';

import promiseMiddleware from 'redux-promise-middleware';

import userReducer from './reducers/userReducer';

export default createStore(userReducer, applyMiddleware(promiseMiddleware()));