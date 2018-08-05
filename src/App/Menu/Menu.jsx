import React from 'react';
import {NavLink} from 'react-router-dom';
import Config from '../Config.jsx';
import './Menu.scss';

/**
 * Menu component.
 */
export default class Menu extends React.Component {

  /**
   * Creates new instance of component.
   * @param {Array} args Arguments.
   */
  constructor(...args) {
    super(...args);

    /**
     * Array of menu items.
     * @type {Array}
     */
    this.items = Config.menu;

    this.onBackClick = this.onBackClick.bind(this);
    this.onNextClick = this.onNextClick.bind(this);
  }

  /**
   * Sends index to parent component.
   * @param  {Number} index Index of clicked item.
   * @return {void}
   */
  sendIndex(index) {
    this.props.onItem && this.props.onItem.call(this, index);
  }

  /**
   * Handles click on menu item.
   * @param  {Number} index Index of menu item.
   * @param  {Proxy}  e     React event.
   * @return {void}
   */
  onClick(index, e) {
    let isPrevent = this.props.disabled
      || e.currentTarget.classList.contains('active');

    if (isPrevent) {
      e.preventDefault();
      return;
    }

    this.sendIndex(index);
  }

  /**
   * Handles click on backward arrow.
   * @param  {Event} e Event.
   * @return {void}
   */
  onBackClick(e) {
    this.onClick(-1, e);
  }

  /**
   * Handles click on forward arros.
   * @param  {Event} e Event.
   * @return {void}
   */
  onNextClick(e) {
    this.onClick(this.items.length, e);
  }

  /**
   * Renders component.
   * @return {*}
   */
  render() {
    let classList = ['menu'];
    this.props.back && classList.push('menu-back');
    this.props.next && classList.push('menu-next');
    classList = classList.join(' ');

    let nextLink = this.props.next || '#';
    let backLink = this.props.back || '#';

    let count = this.items.length;

    let items = this.items.map((item, index) => {
      let click = this.onClick.bind(this, index);
      let link = item.link;
      let text = item.text;

      return (
        <NavLink exact className="menu_item" key={index} to={link} onClick={click}>
          <span className="menu_itemText">{text}</span>
        </NavLink>
      );
    });

    let clickBack = this.onBackClick;
    let clickNext = this.onNextClick;

    return (
      <nav role="navigation" className={classList}>
        {items}
        <NavLink className="menu_item menu_item-back" key={-1} to={backLink} onClick={clickBack}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path fill="currentColor" d="M256 504C119 504 8 393 8 256S119 8 256 8s248 111 248 248-111 248-248 248zm28.9-143.6L209.4 288H392c13.3 0 24-10.7 24-24v-16c0-13.3-10.7-24-24-24H209.4l75.5-72.4c9.7-9.3 9.9-24.8.4-34.3l-11-10.9c-9.4-9.4-24.6-9.4-33.9 0L107.7 239c-9.4 9.4-9.4 24.6 0 33.9l132.7 132.7c9.4 9.4 24.6 9.4 33.9 0l11-10.9c9.5-9.5 9.3-25-.4-34.3z"></path>
          </svg>
        </NavLink>
        <NavLink className="menu_item menu_item-next" key={count} to={nextLink} onClick={clickNext}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path fill="currentColor" d="M256 8c137 0 248 111 248 248S393 504 256 504 8 393 8 256 119 8 256 8zm-28.9 143.6l75.5 72.4H120c-13.3 0-24 10.7-24 24v16c0 13.3 10.7 24 24 24h182.6l-75.5 72.4c-9.7 9.3-9.9 24.8-.4 34.3l11 10.9c9.4 9.4 24.6 9.4 33.9 0L404.3 273c9.4-9.4 9.4-24.6 0-33.9L271.6 106.3c-9.4-9.4-24.6-9.4-33.9 0l-11 10.9c-9.5 9.6-9.3 25.1.4 34.4z"></path>
          </svg>
        </NavLink>
      </nav>
    );
  }
}
