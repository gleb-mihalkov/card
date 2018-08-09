import React from 'react';
import classnames from 'classnames';
import { NavLink } from 'react-router-dom';
import Config from '../Config/Config.jsx';
import MenuItemView from './MenuItemView.jsx';
import './MenuView.scss';

/**
 * Renders view of menu.
 * @param  {String}   back     Link to previuos card.
 * @param  {String}   next     Link to next card.
 * @param  {Boolean}  disabled True if links must be disabled.
 * @param  {Function} onSelect Handler the selected flip type.
 * @return {*}                 React element.
 */
export default ({ location, back, next, disabled, onSelect }) => {
  let className = classnames({
    'menu': true,
    'menu-back': back,
    'menu-next': next
  });

  let count = Config.menu.length;
  let path = location.pathname;

  let backLink = back || '#back';
  let nextLink = next || '#next';

  let items = Config.menu.map((item, index) => {
    let link = item.link;
    let text = item.text;

    return (
      <MenuItemView key={link} index={index} path={path} disabled={disabled} link={link} text={text} onSelect={onSelect} />
    );
  });

  return (
    <nav role="navigation" className={className}>
      {items}
      <MenuItemView key={backLink} index={count} path={path} disabled={disabled} link={backLink} onSelect={onSelect} />
      <MenuItemView key={nextLink} index={count + 1} path={path} disabled={disabled} link={nextLink} onSelect={onSelect} />
    </nav>
  );
};
