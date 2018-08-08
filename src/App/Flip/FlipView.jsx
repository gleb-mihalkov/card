import React from 'react';
import classnames from 'classnames';

/**
 * Renders card's flip wrapper component.
 * @param  {React.Element} children Inner elements.
 * @param  {String}        type     Flipping type from FlipType enum.
 * @param  {Number}        timeout  Duration of animation.
 * @param  {Object}        location Location from Router.
 * @param  {Function}      onEnd    Handles the end of animation.
 * @return {React.Element}          Element.
 */
export const ({ children, type, timeout, location, onEnd }) => {
  let className = classnames({
    ['flip']: true,
    [`flip-${type}`]: type
  });

  return (
    <TransitionGroup className={className}>
      <CSSTransition classNames="flip" key={location.path} timeout={timeout} onExited={onEnd}>
        <Switch location={location}>{children}</Switch>
      </CSSTransition>
    </TransitionGroup>
  );
};
