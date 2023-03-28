/**
 * @typedef {Object} ErrorState
 * @property {Boolean} hasError
 * @property {String} error
*/
/**
 * Retrieves state of the final form validation field error
 *
 * @param {import('react-final-form').FieldMetaState<T>} meta - React final form field component metadata
 *
 * @returns {ErrorState} error text and flag whether to display error or not
 */
function getErrorFromMeta(meta) {
  const error = meta.error || meta.submitError;
  const showError = !!meta.submitError || (!!error && meta.touched);
  return { error, showError };
}
export default getErrorFromMeta;
