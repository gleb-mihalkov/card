import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Route} from 'react-router-dom';
import Github from './Github/Github.jsx';
import Menu from './Menu/Menu.jsx';
import Flip from './Flip/Flip.jsx';
import FlipState from './Flip/FlipState.jsx';
import ListState from './List/ListState.jsx';
import Home from '../Home/Home.jsx';
import About from '../About/About.jsx';
import Contacts from '../Contacts/Contacts.jsx';
import Project from '../Project/Project.jsx';
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

    /**
     * Card's flipping state.
     * @type {FlipState}
     */
    this.flip = new FlipState();

    /**
     * State of model's list.
     * @type {ListState}
     */
    this.list = new ListState();
  }

  /**
   * Returns true if component should be updated.
   * @param  {Object}  props Next properties.
   * @param  {Object}  state Next state.
   * @return {Boolean}       True or false.
   */
  shouldComponentUpdate(props, state) {
    return this.props.location.pathname != props.location.pathname
      || this.state.backLink != state.backLink
      || this.state.nextLink != state.nextLink;
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
  onModels = (model, back, next) => {
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

    let backLink = this.state.backLink;
    let nextLink = this.state.nextLink;

    let flip = this.flip;
    let list = this.list;

    let routes = Object.keys(this.routes).map(path => {
      let Page = this.routes[path];

      let page = (props) => (
        <Page list={list} {...props} />
      );

      return (
        <Route key={path} exact path={path} render={page} />
      );
    });

    return (
      <div className="app">
        <div className="app_main">
          <Flip location={location} flip={flip}>
            {routes}
          </Flip>
        </div>
        <div className="app_aside">
          <Menu flip={flip} list={list} />
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
    let container = (
      <HashRouter>
        <Route path="/" component={this} />
      </HashRouter>
    );

    let rendered = new Promise(resolve => {
      window.addEventListener('DOMContentLoaded', () => {
        let root = document.getElementById('root');
        ReactDOM.render(container, root, resolve);
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
  }
}
