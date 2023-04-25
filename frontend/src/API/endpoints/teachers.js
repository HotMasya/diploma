// Modules
import map from 'lodash/map';

// Api
import API from 'API';

// Models
import Teacher from 'Models/Teacher';

async function findAll(options = {}, requestOptions = {}) {
  return API.instance
    .get('teachers', { params: options }, requestOptions)
    .then((res) => res.data)
    .then((data) => map(data, (item) => new Teacher(item)));
}

async function create(data, requestOptions = {}) {
  return API.instance
    .post('teachers', data, requestOptions)
    .then((res) => new Teacher(res.data));
}

async function remove(teacherId, requestOptions = {}) {
  return API.instance.delete(`teachers/${teacherId}`, requestOptions);
}

async function update(teacherId, data = {}, requestOptions = {}) {
  return API.instance.patch(`teachers/${teacherId}`, data, requestOptions)
    .then((res) => new Teacher(res.data));
}

const teachers = {
  create,
  findAll,
  update,
  remove,
};

export default teachers;
