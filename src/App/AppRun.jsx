import React from 'react';
import { render } from 'react-dom';
import { HashRouter, Route } from 'react-router-dom';

export default (App) => {
  let node = (
    <HashRouter>
      <Route path="/" component={App} />
    </HashRouter>
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
