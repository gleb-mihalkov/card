import React from 'react';
import classnames from 'classnames';
import './LazyImageView.scss';

/**
 * Lazy image view.
 */
export default class LazyImageView extends React.Component {

  /**
   * Handles component mounting.
   * @return {void}
   */
  componentDidMount() {
    let { onMount } = this.props
    onMount.call(this);
  }

  /**
   * Renders view.
   * @return {*} React element.
   */
  render() {
    let { src, loaded } = this.props;

    let className = classnames({
      'lazyImage': true,
      'lazyImage-loaded': loaded
    });

    let style = {};
    loaded && (style.backgroundImage = `url(${src})`);

    return (
      <div className={className} style={style}></div>
    );
  }
}
