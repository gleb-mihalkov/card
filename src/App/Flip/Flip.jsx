import React from 'react';
import {TransitionGroup, CSSTransition} from 'react-transition-group';
import {Switch} from 'react-router-dom';
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
    let classList = ['flip'];
    this.props.type && classList.push(`flip-${this.props.type}`);
    classList = classList.join(' ');

    let location = this.props.location;
    let path = location.pathname;
    let end = this.onEnd;
    let time = this.props.timeout;

    return (
      <TransitionGroup className={classList}>
        <CSSTransition classNames="flip" key={path} timeout={time} onExited={end}>
          <Switch location={location}>
            {this.props.children}
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    );
  }
}
