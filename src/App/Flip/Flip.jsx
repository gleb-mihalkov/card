import { connect } from 'react-redux';
import { flipEnd } from './FlipAction.jsx';
import FlipView from './FlipView.jsx';

/**
 * Assigns new props from state.
 * @param  {Object} state State.
 * @param  {Object} props Own props.
 * @return {Object}       Props for view component.
 */
const getProps = (state, props) => {
  return {
    type: state.flip,
    timeout: props.timeout,
    location: props.location
  };
};

/**
 * Assigns new props with dispatch.
 * @param  {Function} dispatch Dispatches actions.
 * @param  {Object}   props    Own props.
 * @return {Object}            New props.
 */
const getFuncs = (dispatch, props) => {
  return {
    onEnd: () => {
      dispatch(flipEnd());
    }
  };
};

// Create the component.
export default connect(getProps, getFuncs)(FlipView);
