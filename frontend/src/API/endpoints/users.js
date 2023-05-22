// Modules
import map from 'lodash/map';

// Api
import API from 'API';

// Models
import User from 'Models/User';

async function findAll(options = {}, requestOptions = {}) {
  return API.instance
    .get('users', { ...requestOptions, params: options })
    .then((res) => res.data)
    .then((data) => map(data, (d) => new User(d)));
}

async function findOne(userId, options = {}, requestOptions = {}) {
  return API.instance
    .get(`users/${userId}`, { ...requestOptions, params: options })
    .then((res) => new User(res.data));
}

async function me(requestOptions = {}) {
  return API.instance
    .get('users/me', requestOptions)
    .then((res) => new User(res.data));
}

async function create(data, requestOptions = {}) {
  return API.instance
    .post('users', data, requestOptions)
    .then((res) => new User(res.data));
}

async function countTotal(search) {
  return API.instance
    .get('users/count/total', { params: { search } })
    .then((res) => res.data);
}

async function remove(userId, requestOptions = {}) {
  return API.instance.delete(`users/${userId}`, requestOptions);
}

async function changePassword(userId, password, requestOptions = {}) {
  return API.instance.post(
    `users/${userId}/password`,
    { password },
    requestOptions
  );
}

async function checkPassoword(userId, password, requestOptions = {}) {
  return API.instance.post(
    `users/${userId}/password/check`,
    { password },
    requestOptions
  )
}

async function update(userId, data, requestOptions = {}) {
  return API.instance.patch(`users/${userId}`, data, requestOptions)
    .then((res) => new User(res.data));
}

const users = {
  changePassword,
  checkPassoword,
  countTotal,
  create,
  findAll,
  findOne,
  me,
  remove,
  update,
};

export default users;
