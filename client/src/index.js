import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import WebFont from 'webfontloader';

import { store } from 'src/utils/sockets';

import App from './App';
import reportWebVitals from './reportWebVitals';

WebFont.load({
  google: {
    families: ['Jost:400', 'Jost:500', 'Jost:600', 'sans-serif'],
  },
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
