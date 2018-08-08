export const FLIP_START = 'FLIP_START';
export const FLIP_END = 'FLIP_END';

/**
 * Action of start of flipping animation.
 * @param  {String} flipType Flip type from FlipType enum.
 * @return {Object}          Action.
 */
export const flipStart = (flipType) => ({
  type: FLIP_START,
  flipType
});

/**
 * Action of end of flipping animation.
 * @return {Object} Action.
 */
export const flipEnd = () => ({
  type: FLIP_END
});
