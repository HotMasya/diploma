// Modules
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';

export function isRequired(message = 'Це поле є обов\'язковим') {
  return (value) => (isEmpty(value) || isNil(value) ? message : '');
}
