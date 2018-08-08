/**
 * Action's type of start of flipping.
 * @type {String}
 */
export const FLIP_START = 'FLIP_START';

/**
 * Action's type of end of flipping.
 * @type {String}
 */
export const FLIP_END = 'FLIP_END';

/**
 * Action of start of flipping animation.
 * @param  {String} flipType Flip type from FlipType enum.
 * @return {Object}          Action.
 */
export function flipStart(flipType) {
  return {
    type: FLIP_START,
    flipType
  };
};

/**
 * Action of end of flipping animation.
 * @return {Object} Action.
 */
export function flipEnd() {
  return {
    type: FLIP_END
  }
};
