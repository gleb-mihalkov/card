import FlipType from './FlipType.jsx';
import { FLIP_START, FLIP_END } from './FlipAction.jsx';

/**
 * Returns new flip type by action.
 * @param  {String} [state=NONE] Flip type from FlipType enum.
 * @param  {Object} action       Flip action.
 * @return {Object}              Flip type.
 */
export default function flipReducer(state = FlipType.NONE, action) {
  switch (action.type) {
    case FLIP_START: {
      return action.flipType;
    }
    case FLIP_END: {
      return FlipType.NONE;
    }
    default: {
      return state;
    }
  }
}
