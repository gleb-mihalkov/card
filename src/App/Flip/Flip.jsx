import React from 'react';
import {TransitionGroup, CSSTransition} from 'react-transition-group';
import {Switch} from 'react-router-dom';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import Config from '../Config/Config.jsx';
import FlipType from './FlipType.jsx';
import FlipState from './FlipState.jsx';
import './Flip.scss';

/**
 * Component of card's transition.
 */
@observer
export default class Flip extends React.Component {

  /**
   * Property types.
   * @type {Object}
   */
  static propTypes = {

    /**
     * Location of Router.
     * @type {Object}
     */
    location: PropTypes.object.isRequired,

    /**
     * Flipping state.
     * @type {FlipState}
     */
    flip: PropTypes.instanceOf(FlipState)
  }

  /**
   * Handles ending of animation.
   * @return {void}
   */
  onEnd = () => {
    this.props.flip.type = FlipType.NONE;
  }

  /**
   * Renders component.
   * @return {*}
   */
  render() {
    let {location, flip, children} = this.props;

    let classes = {
      'flip': true
    };

    if (flip.type) {
      classes[`flip-${flip.type}`] = true;
    }

    classes = classnames(classes);

    let timeout = Config.flippingDuration;
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
