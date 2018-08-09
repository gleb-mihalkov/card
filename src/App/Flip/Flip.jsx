import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Switch } from 'react-router-dom';
import classnames from 'classnames';
import FlipType from './FlipType.jsx';
import './Flip.scss';

/**
 * Component of card's transition.
 */
export default class Flip extends React.Component {

  /**
   * Handles ending of animation.
   * @return {void}
   */
  onEnd = () => {
    let fn = this.props.setFlip;
    fn && fn(FlipType.NONE);
  }

  /**
   * Renders component.
   * @return {*}
   */
  render() {
    let { location, timeout, type, children } = this.props;

    let classes = classnames({
      ['flip']: true,
      [`flip-${type}`]: type
    });

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
