import { connect } from 'react-redux';
import { flipStart } from '../Flip/FlipAction.jsx';
import FlipType from '../Flip/FlipType.jsx';
import MenuView from './MenuView.jsx';

/**
 * Flip types sorted by menu item's index.
 * @type {Array}
 */
let flipTypes = [
  FlipType.TOP_LEFT,
  FlipType.TOP_RIGHT,
  FlipType.BOTTOM_LEFT,
  FlipType.BOTTOM_RIGHT,
  FlipType.LEFT,
  FlipType.RIGHT
];

/**
 * Returns props for view component.
 * @param  {Object} state Current state.
 * @param  {Object} props Own props.
 * @return {Object}       View props.
 */
let getProps = (state, props) => {
  return {
    disabled: state.flipType != FlipType.NONE,
    back: props.back,
    next: props.next
  };
};

/**
 * Returns dispatchable props for view component.
 * @param  {Function} dispatch Dispatch func.
 * @param  {Object}   props    Own props.
 * @return {Object}            View props.
 */
let getFuncs = (dispatch, props) => {
  return {
    onSelect: (index) => {
      let type = flipTypes[index];
      dispatch(flipStart(type));
    }
  };
};

/**
 * Returns component.
 */
export default connect(getProps, getFuncs)(MenuView);
