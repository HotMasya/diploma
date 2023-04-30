// Modules
import map from 'lodash/map';

// Api
import API from 'API';

// Models
import Group from 'Models/Group';

async function findAll(options = {}, requestOptions = {}) {
  return API.instance
    .get('groups', { params: options }, requestOptions)
    .then((res) => res.data)
    .then((data) => map(data, (item) => new Group(item)));
}

async function remove(groupId, requestOptions = {}) {
  return API.instance.delete(`groups/${groupId}`, requestOptions);
}

async function update(groupId, data, requestOptions = {}) {
  return API.instance
    .patch(`groups/${groupId}`, data, requestOptions)
    .then((res) => new Group(res.data));
}

async function findOne(groupId, requestOptions = {}) {
  return API.instance
    .get(`groups/${groupId}`, requestOptions)
    .then((res) => new Group(res.data));
}

async function countTotal(search, requestOptions = {}) {
  return API.instance
    .get('groups/count/total', { ...requestOptions, params: { search } })
    .then((res) => res.data);
}

async function create(data, requestOptions = {}) {
  return API.instance
    .post('groups', data, requestOptions)
    .then((res) => new Group(res.data));
}

async function removeCurator(groupId, requestOptions = {}) {
  return API.instance
    .delete(`groups/${groupId}/curator/remove`, requestOptions)
    .then((res) => new Group(res.data));
}

async function addStudents(groupId, studentIds, requestOptions = {}) {
  return API.instance.post(
    `groups/${groupId}/students`,
    { studentIds },
    requestOptions
  );
}

async function removeStudent(groupId, studentId, requestOptions = {}) {
  return API.instance.delete(
    `groups/${groupId}/students/${studentId}`,
    requestOptions
  );
}

const groups = {
  addStudents,
  countTotal,
  create,
  findAll,
  findOne,
  remove,
  removeCurator,
  removeStudent,
  update,
};

export default groups;
