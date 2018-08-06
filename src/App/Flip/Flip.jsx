import React from 'react';
import {TransitionGroup, CSSTransition} from 'react-transition-group';
import {Switch} from 'react-router-dom';
import classnames from 'classnames';
import './Flip.scss';

/**
 * Component of card's transition.
 */
export default class Flip extends React.Component {

  /**
   * Creates instance of class.
   * @param {*} args Arguments.
   */
  constructor(...args) {
    super(...args);

    this.onEnd = this.onEnd.bind(this);
  }

  /**
   * Sends flip state to parent component.
   * @param  {Number} value Flip state.
   * @return {void}
   */
  sendFlip(value) {
    this.props.onFlipEnd && this.props.onFlipEnd.call(this, value);
  }

  /**
   * Handles ending of animation.
   * @return {void}
   */
  onEnd() {
    this.sendFlip(null);
  }

  /**
   * Renders component.
   * @return {*}
   */
  render() {
    let {location, timeout, type, children} = this.props;

    let classes = {
      'flip': true
    };

    if (type) {
      classes[`flip-${type}`] = true;
    }

    classes = classnames(classes);

    let path = location.pathname;
    let end = this.onEnd;

    return (
      <TransitionGroup className={classes}>
        <CSSTransition classNames="flip" key={path} timeout={timeout} onExited={end}>
          <Switch location={location}>{children}</Switch>
        </CSSTransition>
      </TransitionGroup>
    );
  }
}
