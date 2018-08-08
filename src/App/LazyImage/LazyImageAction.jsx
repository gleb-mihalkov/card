/**
 * Action type of starting of image loading.
 * @type {String}
 */
export const LAZY_IMAGE_REQUEST = 'LAZY_IMAGE_REQUEST';

/**
 * Action type of ending of image loading.
 * @type {String}
 */
export const LAZY_IMAGE_RECEIVE = 'LAZY_IMAGE_RECEIVE';

/**
 * Returns action of starting of image loading.
 * @param  {String} src URL of image.
 * @return {Object}     Action.
 */
const request = (src) => ({
  type: LAZY_IMAGE_REQUEST,
  src
});

/**
 * Returns action of ending of image loading.
 * @param  {String} src URL of image.
 * @return {Object}     Action.
 */
const receive = (src) => ({
  type: LAZY_IMAGE_RECEIVE,
  src
});

/**
 * Returns true if image must be loaded.
 * @param  {Object}  state State.
 * @param  {String}  src   URL of image.
 * @return {Boolean}       True of false.
 */
const isLoad = (state, src) => {
  let image = state.lazyImages[src];
  let value = !image || (!image.isFetching && !image.isLoaded);
  return value;
};

/**
 * Returns async action of lazy image loading.
 * @param  {String}   src URL of image.
 * @return {Function}     Async action.
 */
export default (src) => (dispatch, getState) => {
  let state = getState();
  let isLoaded = !isLoad(state, src);

  if (isLoaded) {
    return;
  }

  dispatch(request(src));

  return new Promise(resolve => {
    let image = new Image();

    image.onload = () => {
      resolve(dispatch(receive(src)));
    };

    image.src = src;
  });
};
