import '@babel/polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import App from './App';

import './global.scss';

const root = document.createElement('div');
root.id = "root";
document.body.appendChild(root);

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root')
  );
};

render(App);

if (module.hot) module.hot.accept('./App', () => {
  const NextApp = require('./App');
  render(NextApp);
});
