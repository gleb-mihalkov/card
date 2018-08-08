import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Route} from 'react-router-dom';
import Github from './Github/Github.jsx';
import Menu from './Menu/Menu.jsx';
import Flip from './Flip/Flip.jsx';
import Home from '../Home/Home.jsx';
import About from '../About/About.jsx';
import Contacts from '../Contacts/Contacts.jsx';
import Project from '../Project/Project.jsx';
import runApp from './AppRun.jsx';
import './Fonts/Fonts.scss';
import './Reset/Reset.scss';
import './App.scss';

/**
 * Application component.
 */
export default class App extends React.Component {

  /**
   * Creates the intstance of application.
   */
  constructor(...args) {
    super(...args);

    /**
     * Default state.
     * @type {Object}
     */
    this.state = {
      backLink: null,
      nextLink: null,
      flip: null
    };

    /**
     * Collection of routes.
     * @type {Object}
     */
    this.routes = {
      '/projects/:id': Project,
      '/projects': Project,
      '/contacts': Contacts,
      '/about': About,
      '/': Home,
    };

    this.onMenuItem = this.onMenuItem.bind(this);
    this.onModels = this.onModels.bind(this);
    this.onFlipEnd = this.onFlipEnd.bind(this);
  }

  /**
   * Returns true if component should be updated.
   * @param  {Object}  props Next properties.
   * @param  {Object}  state Next state.
   * @return {Boolean}       True or false.
   */
  shouldComponentUpdate(props, state) {
    return this.props.location.pathname != props.location.pathname
      || this.state.flip != state.flip
      || this.state.backLink != state.backLink
      || this.state.nextLink != state.nextLink;
  }

  /**
   * Handles click on menu item.
   * @param  {Number} index Index of clicked menu item.
   * @return {void}
   */
  onMenuItem(index) {
    let flip;

    switch (index) {
      case -1: flip = 'left'; break;
      case 0: flip = 'top-left'; break;
      case 1: flip = 'top-right'; break;
      case 2: flip = 'bottom-left'; break;
      case 3: flip = 'bottom-right'; break;
      case 4: flip = 'right'; break;
    }

    this.setState({flip});
  }

  /**
   * Handles end of card flip.
   * @return {void}
   */
  onFlipEnd() {
    this.setState({
      flip: null
    });
  }

  /**
   * Returns base part of current location.
   * @param  {Object} model Current model.
   * @return {String}       Base part of link.
   */
  getBaseLink(model) {
    let regexp = new RegExp(`/${model.id}$`);
    let path = this.props.location.pathname;
    let base = path.replace(regexp, '').replace(/\/$/, '');
    return base;
  }

  /**
   * Handlers models loading.
   * @param  {Object} model Current model.
   * @param  {Object} back  Previous model.
   * @param  {Object} next  Next model.
   * @return {void}
   */
  onModels(model, back, next) {
    let base = this.getBaseLink(model);

    let backLink = back ? `${base}/${back.id}` : null;
    let nextLink = next ? `${base}/${next.id}` : null;

    this.setState({
      backLink,
      nextLink
    });
  }

  /**
   * Renders component.
   * @return {*}
   */
  render() {
    let location = this.props.location;
    let flip = this.state.flip;

    let backLink = this.state.backLink;
    let nextLink = this.state.nextLink;

    let clickMenu = this.onMenuItem;
    let flipEnd = this.onFlipEnd;

    let routes = Object.keys(this.routes).map(path => {
      let Page = this.routes[path];

      let page = (props) => (
        <Page onModels={this.onModels} {...props} />
      );

      return (
        <Route key={path} exact path={path} render={page} />
      );
    });

    let isDisabed = flip != null;

    return (
      <div className="app">
        <div className="app_main">
          <Flip location={location} type={flip} timeout={1000} onFlipEnd={flipEnd}>
            {routes}
          </Flip>
        </div>
        <div className="app_aside">
          <Menu back={backLink} next={nextLink} disabled={isDisabed} onItem={clickMenu} />
        </div>
        <div className="app_aside app_aside-bottom">
          <Github />
        </div>
      </div>
    );
  }

  /**
   * Runs application.
   * @return {void}
   */
  static start() {
    runApp(this);
  }
}
