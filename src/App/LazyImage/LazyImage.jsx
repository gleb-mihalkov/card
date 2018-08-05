import React from 'react';
import './LazyImage.scss';

/**
 * Component of image with lazy loading.
 */
export default class LazyImage extends React.Component {

  /**
   * Creates new instance of component.
   * @param {Array} args Arguments.
   */
  constructor(...args) {
    super(...args);

    /**
     * Default state.
     * @type {Object}
     */
    this.state = {
      isLoaded: false
    };

    this.onLoad = this.onLoad.bind(this);
  }

  /**
   * Loads image.
   * @param  {String} src Address of image.
   * @return {void}
   */
  load(src) {
    let self = this.constructor;
    self.urls = self.urls || {};

    if (self.urls[src]) {
      return;
    }

    let image = new Image();

    image.onload = () => {
      self.urls[src] = true;

      this.setState({
        isLoaded: true
      });
    };

    image.src = src;
  }

  /**
   * Calls when component has been mounted.
   * @return {void}
   */
  componentDidMount() {
    this.load(this.props.src);
  }

  /**
   * Handles loading of image.
   * @param  {String} url URL of image.
   * @return {void}
   */
  onLoad() {
    this.setState({
      isLoaded: true
    });
  }

  /**
   * Renders component.
   * @return {*}
   */
  render() {
    let self = this.constructor;
    let src = this.props.src;
    
    let isLoaded = this.state.isLoaded || self.urls && self.urls[src];
    let image = isLoaded ? {backgroundImage: `url(${src})`} : null;

    let classList = ['lazyImage'];
    isLoaded && classList.push('lazyImage-loaded');
    classList = classList.join(' ');

    return (
      <span className={classList} style={image}></span>
    );
  }
}
