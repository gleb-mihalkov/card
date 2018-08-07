/**
 * Flipping type.
 * @type {String}
 */
export default {
  LEFT: 'left',
  RIGHT: 'right',
  TOP_LEFT: 'top-left',
  TOP_RIGHT: 'top-right',
  BOTTOM_LEFT: 'bottom-left',
  BOTTOM_RIGHT: 'bottom-right',
  NONE: null,

  /**
   * Returns FlipType by its index in the sequence [-1: LEFT, 0: TOP_LEFT,
   * 1: TOP_RIGHT, 2: BOTTOM_LEFT, 3: BOTTOM_RIGHT, 4: RIGHT].
   * @param  {Number} index Index.
   * @return {String}       Flip type.
   */
  getByIndex(index) {
    let type = this.NONE;

    switch (index) {
      case -1: {
        type = this.LEFT;
        break;
      }
      case 0: {
        type = this.TOP_LEFT;
        break;
      }
      case 1: {
        type = this.TOP_RIGHT;
        break;
      }
      case 2: {
        type = this.BOTTOM_LEFT;
        break;
      }
      case 3: {
        type = this.BOTTOM_RIGHT;
        break;
      }
      case 4: {
        type = this.RIGHT;
        break;
      }
      default: {
        throw new Error(`Index ${index} is out of range`);
      }
    }

    return type;
  }
};
