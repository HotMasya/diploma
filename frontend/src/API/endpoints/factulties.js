// Modules
import map from 'lodash/map';

// Api
import API from 'API';

// Models
import Faculty from 'Models/Faculty';

async function findAll(options = {}, requestOptions = {}) {
  return API.instance
    .get('faculties', { params: options }, requestOptions)
    .then((res) => res.data)
    .then((data) => map(data, (item) => new Faculty(item)));
}

async function remove(facultyId, requestOptions = {}) {
  return API.instance.delete(`faculties/${facultyId}`, requestOptions);
}

async function create(data, requestOptions = {}) {
  return API.instance
    .post('faculties', data)
    .then((res) => new Faculty(res.data));
}

async function update(id, data, requestOptions = {}) {
  return API.instance
    .patch(`faculties/${id}`, data)
    .then((res) => new Faculty(res.data));
}

async function countTotal(search) {
  return API.instance
    .get('faculties/count/total', { params: { search } })
    .then((res) => res.data);
}

const faculties = {
  create,
  update,
  countTotal,
  findAll,
  remove,
};

export default faculties;
