import React from 'react';
import classnames from 'classnames';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Switch } from 'react-router';
import './FlipView.scss';

/**
 * Renders card's flip wrapper component.
 * @param  {React.Element} children Inner elements.
 * @param  {String}        type     Flipping type from FlipType enum.
 * @param  {Number}        timeout  Duration of animation.
 * @param  {Object}        location Location from Router.
 * @param  {Function}      onEnd    Handles the end of animation.
 * @return {React.Element}          Element.
 */
export default ({ children, type, timeout, location, onEnd }) => {
  let className = classnames({
    ['flip']: true,
    [`flip-${type}`]: type
  });

  return (
    <TransitionGroup className={className}>
      <CSSTransition classNames="flip" key={location.pathname} timeout={timeout} onExited={onEnd}>
        <Switch location={location}>{children}</Switch>
      </CSSTransition>
    </TransitionGroup>
  );
};
