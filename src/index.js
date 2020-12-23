import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import WebFont from 'webfontloader';

import reducers from 'src/reducers';
import username from 'src/utils/names';
import handleNewMessage from 'src/utils/sagas';
import setupSocket from 'src/utils/sockets';

import App from './App';
import reportWebVitals from './reportWebVitals';

WebFont.load({
  google: {
    families: ['Jost:400', 'Jost:500', 'Jost:600', 'sans-serif'],
  },
});

// WebSocket and Reducer setup
const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducers, applyMiddleware(sagaMiddleware));
const socket = setupSocket(store.dispatch, username);
sagaMiddleware.run(handleNewMessage, { socket, username });

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
