import { LAZY_IMAGE_REQUEST, LAZY_IMAGE_RECEIVE } from './LazyImageAction.jsx';

/**
 * Initial image state.
 * @type {Object}
 */
const initialState = {
  isFetching: false,
  isLoaded: false,
  src: null
};

/**
 * Returns new state for single image.
 * @param  {Object} [state=initialState] Previous state.
 * @param  {Object} action Action.
 * @return {Object}        New state.
 */
const getState = (state = initialState, action) => {
  switch (action.type) {
    case LAZY_IMAGE_REQUEST: return {
      ...state,
      isFetching: true,
      isLoaded: false,
      src: action.src
    };
    case LAZY_IMAGE_RECEIVE: return {
      ...state,
      isFetching: false,
      isLoaded: true,
      src: action.src
    };
    default: return state;
  }
};

/**
 * Returns new state.
 * @param  {Object} [state={}] Previous state.
 * @param  {Object} action     Action.
 * @return {Object}            New state.
 */
export default (state = {}, action) => {
  switch (action.type) {
    case LAZY_IMAGE_REQUEST:
    case LAZY_IMAGE_RECEIVE: return {
      ...state,
      [action.src]: getState(state[action.src], action)
    };
    default: return state;
  }
};
