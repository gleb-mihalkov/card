/**
 * Informaion about list.
 */
export default class ListInfo {

  /**
   * Creates instance of class.
   * @param {Object}   current  Current model.
   * @param {Object}   previous Previous model.
   * @param {Object}   next     Next model.
   */
  constructor(current, previous, next) {

    /**
     * Current model.
     * @type {Object}
     */
    this.current = current;

    /**
     * Previous model.
     * @type {Object}
     */
    this.previous = previous;

    /**
     * Next model.
     * @type {Object}
     */
    this.next = next;
  }

  /**
   * Returns base part of link to model.
   * @return {String} Base part of link.
   */
  getLinkBase() {
    let path = location.hash.replace(/^#/, '') || '/';
    let regexp = new RegExp(`/${this.current.id}$`);
    let base = path.replace(regexp, '').replace(/\/$/, '');
    return base;
  }

  /**
   * Returns link to model.
   * @param  {Object} model Model.
   * @return {String}       Link.
   */
  getLink(model) {
    if (!model) {
      return null;
    }

    let base = this.getLinkBase();
    return `${base}/${model.id}`;
  }

  /**
   * Returns link to previous model.
   * @return {String} Link.
   */
  get backLink() {
    return this.getLink(this.previous);
  }

  /**
   * Returns link to next model.
   * @return {String} Link.
   */
  get nextLink() {
    return this.getLink(this.next);
  }
}
