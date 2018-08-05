import React from 'react';
import Axios from 'axios';
import Config from './Config.jsx';
import Card from './Card/Card.jsx';

/**
 * Base class of container component.
 */
export default class PageContainer extends React.Component {

  /**
   * Creates the instance of container.
   */
  constructor(...args) {
    super(...args);

    /**
     * Default state.
     * @type {Object}
     */
    this.state = {
      models: null
    };

    /**
     * True if container is mounted in DOM.
     * @type {Boolean}
     */
    this.isAttached = false;

    /**
     * Index of model in container.
     * @type {Number}
     */
    this.index = -1;

    /**
     * Count of models in container.
     * @type {Number}
     */
    this.count = -1;

    /**
     * Model for rendering.
     * @type {Object}
     */
    this.model = null;

    /**
     * Next model in container.
     * @type {Object}
     */
    this.next = null;

    /**
     * Previous model in container.
     * @type {Object}
     */
    this.prev = null;
  }

  /**
   * Returns URL of API with models.
   * @abstract
   * @return {String} URL.
   */
  getUrl() {
    throw new Error(`Abstract method is not implemented`);
  }

  /**
   * Renders component when model has been loaded.
   * @abstract
   * @return {void}
   */
  renderModel() {
    throw new Error(`Abstract method is not implemented`);
  }

  /**
   * Returns promise which resolves array of models.
   * @return {Promise} Promise of models.
   */
  getModels() {
    let self = this.constructor;
    let url = this.getUrl();

    if (self.promise) {
      return self.promise;
    }

    if (self.models) {
      return Promise.resolve(self.models);
    }

    let time = Config.minRequestTime;

    let timeout = new Promise(cb => setTimeout(cb, time));

    let request = Axios.get(url).then(response => {
      let models = response.data;

      delete(self.promise);

      self.models = self.models || {};
      return self.models = models;
    });

    return self.promise = Promise.all([request, timeout])
      .then(() => self.models);
  }

  /**
   * Calling when component has been mounted.
   * @return {void}
   */
  componentDidMount() {
    this.isAttached = true;

    this.getModels().then(models => {
      if (!this.isAttached) {
        return;
      }

      this.setState({models});
    });
  }

  /**
   * Returns true if component might be updated.
   * @param  {Object}  props Next props.
   * @param  {Object}  state Next state.
   * @return {Boolean}       True of false.
   */
  shouldComponentUpdate(props, state) {
    return this.props.location.pathname !== props.location.pathname
      || this.state.models !== state.models;
  }

  /**
   * Executes after updating.
   * @return {void}
   */
  componentDidUpdate() {
    this.props.onModels
      && this.props.onModels.call(this, this.model, this.prev, this.next);
  }

  /**
   * Calling when component has been unmounted.
   * @return {void}
   */
  componentWillUnmount() {
    this.isAttached = false;
  }

  /**
   * Renders component.
   * @return {*}
   */
  render() {
    if (!this.state.models) {
      return (
        <Card isLoading={true}></Card>
      );
    }

    let id =
      this.props.match && this.props.match.params && this.props.match.params.id
      || this.state.models && this.state.models[0] && this.state.models[0].id;

    this.index = this.state.models.findIndex(m => m.id === id);
    this.next = this.index >= 0 && this.state.models[this.index + 1] || null;
    this.prev = this.index >= 0 && this.state.models[this.index - 1] || null;
    this.model = this.index >= 0 && this.state.models[this.index] || null;
    this.count = this.state.models.length;

    return this.renderModel();
  }
}
