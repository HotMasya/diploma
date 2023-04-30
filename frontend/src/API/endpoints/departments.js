// Modules
import map from 'lodash/map';

// Api
import API from 'API';

// Models
import Department from 'Models/Department';

async function findAll(options = {}, requestOptions = {}) {
  return API.instance
    .get('departments', { params: options }, requestOptions)
    .then((res) => res.data)
    .then((data) => map(data, (item) => new Department(item)));
}

async function create(data, requestOptions = {}) {
  return API.instance
    .post('departments', data)
    .then((res) => new Department(res.data));
}

async function update(id, data, requestOptions = {}) {
  return API.instance
    .patch(`departments/${id}`, data)
    .then((res) => new Department(res.data));
}

async function remove(id, requestOptions = {}) {
  return API.instance.delete(`departments/${id}`, requestOptions);
}

async function countTotal(search) {
  return API.instance
    .get('departments/count/total', { params: { search } })
    .then((res) => res.data);
}

const departments = {
  countTotal,
  create,
  findAll,
  remove,
  update,
};

export default departments;
