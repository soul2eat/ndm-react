import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import SocketMiddleware from "./utils/socket-middleware";
import App from './components/App-container';
import Snackbar from './modules/Snackbar'

import StoreReducers from './store'
import { socketConnect } from "./store/socket"
export const store = createStore( StoreReducers, applyMiddleware(SocketMiddleware) );
store.dispatch(socketConnect());
ReactDOM.render (
  <Provider store={store}>
    <App color="Blue" />
    <Snackbar/>
  </Provider>,
  document.getElementById("root")
);

