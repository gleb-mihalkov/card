import { connect } from 'react-redux';
import { flipEnd } from './FlipAction.jsx';
import FlipView from './FlipView.jsx';

/**
 * Assigns new props from state.
 * @param  {Object} state State.
 * @param  {Object} props Own props.
 * @return {Object}       Props for view component.
 */
const stateToProps = (state, props) => {
  return {
    type: state.flip
  };
};

/**
 * Assigns new props with dispatch.
 * @param  {Function} dispatch Dispatches actions.
 * @param  {Object}   props    Own props.
 * @return {Object}            New props.
 */
const dispatchToProps = (dispatch, props) => {
  return {
    onEnd: () => dispatch(flipEnd())
  };
};

// Create the component.
export default connect(stateToProps, dispatchToProps)(FlipView);
