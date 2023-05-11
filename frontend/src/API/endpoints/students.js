// Modules
import map from 'lodash/map';

// Api
import API from 'API';

// Models
import Student from 'Models/Student';

async function findAll(options = {}, requestOptions = {}) {
  return API.instance
    .get('students', { params: options }, requestOptions)
    .then((res) => res.data)
    .then((data) => map(data, (item) => new Student(item)));
}

async function create(data, requestOptions = {}) {
  return API.instance
    .post('students', data, requestOptions)
    .then((res) => new Student(res.data));
}

async function remove(teacherId, requestOptions = {}) {
  return API.instance.delete(`students/${teacherId}`, requestOptions);
}

async function update(studentId, data = {}, requestOptions = {}) {
  return API.instance.patch(`students/${studentId}`, data, requestOptions)
    .then((res) => new Student(res.data));
}

async function countTotal(search) {
  return API.instance
    .get('students/count/total', { params: { search } })
    .then((res) => res.data);
}

const students = {
  countTotal,
  create,
  findAll,
  update,
  remove,
};

export default students;
