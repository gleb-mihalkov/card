import React from 'react';
import {NavLink} from 'react-router-dom';
import {observer} from 'mobx-react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Config from '../Config/Config.jsx';
import FlipState from '../Flip/FlipState.jsx';
import FlipType from '../Flip/FlipType.jsx';
import './Menu.scss';

/**
 * Menu component.
 */
@observer
export default class Menu extends React.Component {

  /**
   * Property types.
   * @type {Object}
   */
  static propTypes = {

    /**
     * Flipping state object.
     * @type {FlipState}
     */
    flip: PropTypes.instanceOf(FlipState),

    /**
     * Link to previous card.
     * @type {String}
     */
    back: PropTypes.string,

    /**
     * Link to next card.
     * @type {String}
     */
    next: PropTypes.string
  }

  /**
   * Types of card's flipping by indexes of links.
   * @type {Array}
   */
  static flipTypes = [
    FlipType.TOP_LEFT,
    FlipType.TOP_RIGHT,
    FlipType.BOTTOM_LEFT,
    FlipType.BOTTOM_RIGHT,
    FlipType.LEFT,
    FlipType.RIGHT
  ]

  /**
   * Handles click on menu item.
   * @param  {Proxy} e React event.
   * @return {void}
   */
  onClick = e => {
    let isPrevent = this.props.flip.isFlipping
      || e.currentTarget.classList.contains('active');

    if (isPrevent) {
      e.preventDefault();
      return;
    }

    let node = e.currentTarget;
    let nodes = node.parentNode.childNodes;
    let index = Array.prototype.indexOf.call(nodes, node);

    let type = this.constructor.flipTypes[index];
    this.props.flip.type = type;
  }

  /**
   * Renders component.
   * @return {*}
   */
  render() {
    let back = this.props.list.info.backLink;
    let next = this.props.list.info.nextLink;

    let classes = classnames({
      'menu': true,
      'menu-back': back,
      'menu-next': next
    });

    let nextLink = next || '#';
    let backLink = back || '#';

    let count = Config.menu.length;
    let click = this.onClick;

    let items = Config.menu.map((item, index) => {
      let link = item.link;
      let text = item.text;

      return (
        <NavLink exact className="menu_item" key={index} to={link} onClick={click}>
          <span className="menu_itemText">{text}</span>
        </NavLink>
      );
    });

    return (
      <nav role="navigation" className={classes}>
        {items}
        <NavLink className="menu_item menu_item-back" key={-1} to={backLink} onClick={click}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path fill="currentColor" d="M256 504C119 504 8 393 8 256S119 8 256 8s248 111 248 248-111 248-248 248zm28.9-143.6L209.4 288H392c13.3 0 24-10.7 24-24v-16c0-13.3-10.7-24-24-24H209.4l75.5-72.4c9.7-9.3 9.9-24.8.4-34.3l-11-10.9c-9.4-9.4-24.6-9.4-33.9 0L107.7 239c-9.4 9.4-9.4 24.6 0 33.9l132.7 132.7c9.4 9.4 24.6 9.4 33.9 0l11-10.9c9.5-9.5 9.3-25-.4-34.3z"></path>
          </svg>
        </NavLink>
        <NavLink className="menu_item menu_item-next" key={count} to={nextLink} onClick={click}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path fill="currentColor" d="M256 8c137 0 248 111 248 248S393 504 256 504 8 393 8 256 119 8 256 8zm-28.9 143.6l75.5 72.4H120c-13.3 0-24 10.7-24 24v16c0 13.3 10.7 24 24 24h182.6l-75.5 72.4c-9.7 9.3-9.9 24.8-.4 34.3l11 10.9c9.4 9.4 24.6 9.4 33.9 0L404.3 273c9.4-9.4 9.4-24.6 0-33.9L271.6 106.3c-9.4-9.4-24.6-9.4-33.9 0l-11 10.9c-9.5 9.6-9.3 25.1.4 34.4z"></path>
          </svg>
        </NavLink>
      </nav>
    );
  }
}
