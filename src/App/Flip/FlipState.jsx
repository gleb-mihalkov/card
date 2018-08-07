import {observable} from 'mobx';
import FlipType from './FlipType.jsx';

/**
 * State of flipping of cards.
 */
export default class FlipState {

  /**
   * Type of flipping.
   * @type {String}
   */
  @observable type = null;

  /**
   * Returns true if flipping is in progress.
   */
  @computed get isFlipping() {
    return this.type !== FlipType.NONE;
  }
}
