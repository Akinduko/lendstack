// IMPORT PACKAGE REFERENCES

import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore } from 'redux-persist';

// IMPORT MIDDLEWARE

import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import { createLogger } from 'redux-logger';

// IMPORT REDUCERS

import reducer from '../reducers';

const loggerMiddleware = createLogger({
  predicate: () => process.env.NODE_ENV === 'development'
});


const enhancer = compose(applyMiddleware(promise(), thunk, loggerMiddleware));

// CONFIGURE STORE


let store = createStore(reducer, {}, enhancer);
let persistor = persistStore(store);

export default () => {
  return { store, persistor };
};
