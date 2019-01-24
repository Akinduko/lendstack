import './polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import * as serviceWorker from './registerServiceWorker';
//import { unregister } from './registerServiceWorker';
import getStore from './state/stores/AppStore';
import { PersistGate } from 'redux-persist/integration/react';
const { store, persistor } = getStore();
ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.register();

