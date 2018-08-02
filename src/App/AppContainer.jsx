import React from 'react';
import {HashRouter as Router, Route} from 'react-router-dom';
import App from './App.jsx';

/**
 * Application container.
 */
export default class AppContainer extends React.Component {

  /**
   * Renders component.
   * @return {*}
   */
  render() {
    return (
      <Router>
        <Route path="/" component={App} />
      </Router>
    );
  }
}
