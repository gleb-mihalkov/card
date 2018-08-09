import React from 'react';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import Config from '../Config/Config.jsx';
import FlipType from '../Flip/FlipType.jsx';
import './Menu.scss';

/**
 * Menu component.
 */
export default class Menu extends React.Component {

  /**
   * Handles click on menu item.
   * @param  {Proxy} e React event.
   * @return {void}
   */
  onClick = (e) => {
    let isPrevent = this.props.disabled
      || e.currentTarget.classList.contains('active');

    if (isPrevent) {
      e.preventDefault();
      return;
    }

    let childs = e.currentTarget.parentNode.childNodes;
    let index = Array.prototype.indexOf.call(childs, e.currentTarget);

    let flipTypes = [
      FlipType.TOP_LEFT,
      FlipType.TOP_RIGHT,
      FlipType.BOTTOM_LEFT,
      FlipType.BOTTOM_RIGHT,
      FlipType.LEFT,
      FlipType.RIGHT
    ];

    let flipType = flipTypes[index];
    let fn = this.props.setFlip;
    fn && fn(flipType);
  }

  /**
   * Renders component.
   * @return {*}
   */
  render() {
    let { back, next } = this.props;

    let classes = classnames({
      'menu': true,
      'menu-back': back,
      'menu-next': next
    });

    let count = Config.menu.length;
    let linkBack = back || '#back';
    let linkNext = next || '#next';
    let click = this.onClick;

    let items = Config.menu.map((item) => {
      let link = item.link;
      let text = item.text;

      return (
        <NavLink exact className="menu_item" key={link} to={link} onClick={click}>
          <span className="menu_itemText">{text}</span>
        </NavLink>
      );
    });

    return (
      <nav role="navigation" className={classes}>
        {items}
        <NavLink className="menu_item menu_item-back" key={linkBack} to={linkBack} onClick={click}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path fill="currentColor" d="M256 504C119 504 8 393 8 256S119 8 256 8s248 111 248 248-111 248-248 248zm28.9-143.6L209.4 288H392c13.3 0 24-10.7 24-24v-16c0-13.3-10.7-24-24-24H209.4l75.5-72.4c9.7-9.3 9.9-24.8.4-34.3l-11-10.9c-9.4-9.4-24.6-9.4-33.9 0L107.7 239c-9.4 9.4-9.4 24.6 0 33.9l132.7 132.7c9.4 9.4 24.6 9.4 33.9 0l11-10.9c9.5-9.5 9.3-25-.4-34.3z"></path>
          </svg>
        </NavLink>
        <NavLink className="menu_item menu_item-next" key={linkNext} to={linkNext} onClick={click}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path fill="currentColor" d="M256 8c137 0 248 111 248 248S393 504 256 504 8 393 8 256 119 8 256 8zm-28.9 143.6l75.5 72.4H120c-13.3 0-24 10.7-24 24v16c0 13.3 10.7 24 24 24h182.6l-75.5 72.4c-9.7 9.3-9.9 24.8-.4 34.3l11 10.9c9.4 9.4 24.6 9.4 33.9 0L404.3 273c9.4-9.4 9.4-24.6 0-33.9L271.6 106.3c-9.4-9.4-24.6-9.4-33.9 0l-11 10.9c-9.5 9.6-9.3 25.1.4 34.4z"></path>
          </svg>
        </NavLink>
      </nav>
    );
  }
}
