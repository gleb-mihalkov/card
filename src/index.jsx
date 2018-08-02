import React from 'react';
import ReactDOM from 'react-dom';
import App from './App/AppContainer.jsx';

let loaded = (() => {
  let preload = document.getElementById('preload');
  let count = 0;

  return () => {
    count += 1;

    return () => {
      if (--count > 0) {
        return;
      }

      document.body.classList.remove('loading');
      setTimeout(() => preload.remove(), 250);
    };
  };
})();

window.addEventListener('load', loaded(), {once: true});

window.addEventListener('DOMContentLoaded', () => {
  let root = document.getElementById('root');
  ReactDOM.render(<App />, root, loaded());
});
