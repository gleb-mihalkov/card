import React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import Config from '../Config/Config.jsx';

/**
 * Back icon.
 * @type {*}
 */
const backIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
    <path fill="currentColor" d="M256 504C119 504 8 393 8 256S119 8 256 8s248 111 248 248-111 248-248 248zm28.9-143.6L209.4 288H392c13.3 0 24-10.7 24-24v-16c0-13.3-10.7-24-24-24H209.4l75.5-72.4c9.7-9.3 9.9-24.8.4-34.3l-11-10.9c-9.4-9.4-24.6-9.4-33.9 0L107.7 239c-9.4 9.4-9.4 24.6 0 33.9l132.7 132.7c9.4 9.4 24.6 9.4 33.9 0l11-10.9c9.5-9.5 9.3-25-.4-34.3z"></path>
  </svg>
);

/**
 * Next icon.
 * @type {*}
 */
const nextIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
    <path fill="currentColor" d="M256 8c137 0 248 111 248 248S393 504 256 504 8 393 8 256 119 8 256 8zm-28.9 143.6l75.5 72.4H120c-13.3 0-24 10.7-24 24v16c0 13.3 10.7 24 24 24h182.6l-75.5 72.4c-9.7 9.3-9.9 24.8-.4 34.3l11 10.9c9.4 9.4 24.6 9.4 33.9 0L404.3 273c9.4-9.4 9.4-24.6 0-33.9L271.6 106.3c-9.4-9.4-24.6-9.4-33.9 0l-11 10.9c-9.5 9.6-9.3 25.1.4 34.4z"></path>
  </svg>
);

/**
 * Returns true if link is current.
 * @param  {String}  link  Link.
 * @param  {String}  path  Location pathname.
 * @param  {Boolean} exact True if need to use the strict match of urls.
 * @return {Boolean}       True or false.
 */
const isCurrent = (link, path, exact) => {
  let value = exact && path === link || !exact && path.startsWith(link);
  return value;
};

/**
 * Renders menu item.
 * @param  {Boolean}  exact    True if need to use strict match for urls.
 * @param  {String}   path     Current path in location.
 * @param  {Number}   index    Index of menu item in list.
 * @param  {String}   link     Link of item.
 * @param  {String}   text     Text of item.
 * @param  {Boolean}  disabled True if item is disabled.
 * @param  {Function} onSelect Handler of click on item.
 * @return {*}                 React node.
 */
export default ({ exact, path, index, link, text, disabled, onSelect }) => {
  let count = Config.menu.length;
  let content = null;

  let className = classnames({
    'menu_item': true,
    'menu_item-back': index === count,
    'menu_item-next': index > count
  });

  if (index < count) {
    content = (
      <span className="menu_itemText">{text}</span>
    );
  }
  else {
    content = index == count ? backIcon : nextIcon;
  }

  let select = (e) => {
    let isPrevent = disabled || isCurrent(link, path, exact);

    if (isPrevent) {
      e.preventDefault();
      return;
    }

    onSelect(index);
  };

  return (
    <Link className={className} to={link} onClick={select}>
      {content}
    </Link>
  );
};
