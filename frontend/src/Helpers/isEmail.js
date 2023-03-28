// Modules
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';

const emailRegex = new RegExp(
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);

export function isEmail(message = 'Електронна пошта некорректна') {
  return (value) =>
    isEmpty(value) || isNil(value) || !emailRegex.test(value) ? message : '';
}
