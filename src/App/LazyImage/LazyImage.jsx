import { connect } from 'react-redux';
import load from './LazyImageAction.jsx';
import LazyImageView from './LazyImageView.jsx';

/**
 * Returns props for view.
 * @param  {Object} state State.
 * @param  {Object} props Own props.
 * @return {Object}       Props.
 */
let getProps = (state, props) => ({
  src: props.src,
  loaded: state.lazyImages[props.src] && state.lazyImages[props.src].isLoaded
});

/**
 * Returns handlers for view.
 * @param  {Function} dispatch dispatch func.
 * @param  {Object}   props    Own props.
 * @return {Object}            Handlers.
 */
let getFuncs = (dispatch, props) => ({
  onMount: () => {
    dispatch(load(props.src));
  }
});

/**
 * Lazy image component.
 */
export default connect(getProps, getFuncs)(LazyImageView);
