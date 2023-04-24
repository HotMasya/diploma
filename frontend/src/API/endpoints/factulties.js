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

const faculties = {
  findAll,
  remove,
};

export default faculties;
