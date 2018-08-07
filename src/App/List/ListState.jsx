import {observable} from 'mobx';
import ListInfo from './ListInfo.jsx';

/**
 * State of information about the model's list.
 */
export default class ListState {

  /**
   * Object with information about current list.
   * @type {ListInfo}
   */
  @observable info = new ListInfo();

  /**
   * Sets information about the list.
   * @param {Object} current  Current model.
   * @param {Object} previous Previous model.
   * @param {Object} next     Next model.
   */
  setInfo(current, previous, next) {
    let isEquals = this.info.current === current
      && this.info.previous === previous
      && this.info.next === next;

    if (isEquals) {
      return;
    }

    this.info = new ListInfo(current, previous, next);
  }
}
