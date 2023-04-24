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

const departments = {
  findAll,
};

export default departments;
