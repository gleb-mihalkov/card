import React from 'react';
import { render } from 'react-dom';
import { HashRouter, Route } from 'react-router-dom';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { Provider as ReduxProvider } from 'react-redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk'

export default (App, reducers = {}) => {
  let store = createStore(combineReducers(reducers), applyMiddleware(
    thunkMiddleware,
    // createLogger()
  ));

  let node = (
    <ReduxProvider store={store}>
      <HashRouter>
        <Route path="/" component={App} />
      </HashRouter>
    </ReduxProvider>
  );

  let rendered = new Promise(resolve => {
    window.addEventListener('DOMContentLoaded', () => {
      let root = document.getElementById('root');
      render(node, root, resolve);
    });
  });

  let loaded = new Promise(resolve => {
    window.addEventListener('load', resolve, {once: true});
  });

  Promise.all([rendered, loaded]).then(() => {
    let preload = document.getElementById('preload');
    document.body.classList.remove('loading');
    setTimeout(() => preload.remove(), 250);
  });
};
