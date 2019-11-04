import '@babel/polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
// import Dashboard from "./components/Dashboard";

import { AppContainer } from 'react-hot-loader';

import App from './App';

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

if (module.hot) module.hot.accept('./App.js', () => render(App));
