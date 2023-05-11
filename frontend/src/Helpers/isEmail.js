// Modules
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';
import * as EmailValidator from 'email-validator';

export function isEmail(message = 'Електронна пошта некорректна') {
  return (value) =>
    isEmpty(value) || isNil(value) || !EmailValidator.validate(value) ? message : '';
}
