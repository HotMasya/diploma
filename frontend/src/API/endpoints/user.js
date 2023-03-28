// Modules
import map from 'lodash/map';

// Api
import API from 'API';

// Models
import User from 'Models/User';

async function findAll(options, requestOptions = {}) {
  return API.instance
    .get('users', { ...requestOptions, params: options })
    .then((res) => res.data)
    .then((data) => map(data, (d) => new User(d)));
}

async function me(requestOptions = {}) {
  return API.instance.get('users/me', requestOptions).then((res) => new User(res.data));
}

const users = {
  findAll,
  me,
};

export default users;
