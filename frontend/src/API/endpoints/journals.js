// Modules
import map from 'lodash/map';

// Api
import API from 'API';

// Models
import Journal from 'Models/Journal';

async function findAll(options = {}, requestOptions = {}) {
  return API.instance
    .get('journals', { params: options }, requestOptions)
    .then((res) => res.data)
    .then((data) => map(data, (item) => new Journal(item)));
}

async function remove(facultyId, requestOptions = {}) {
  return API.instance.delete(`journals/${facultyId}`, requestOptions);
}

async function create(data, requestOptions = {}) {
  return API.instance
    .post('journals', data)
    .then((res) => new Journal(res.data));
}

async function update(id, data, requestOptions = {}) {
  return API.instance
    .patch(`journals/${id}`, data)
    .then((res) => new Journal(res.data));
}

async function countTotal(search) {
  return API.instance
    .get('journals/count/total', { params: { search } })
    .then((res) => res.data);
}

const journals = {
  create,
  update,
  countTotal,
  findAll,
  remove,
};

export default journals;
