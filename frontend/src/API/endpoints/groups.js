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

async function update(userId, data, requestOptions = {}) {
  return API.instance.patch(`groups/${userId}`, data, requestOptions)
    .then((res) => new Group(res.data));
}

const groups = {
  findAll,
  remove,
  update,
};

export default groups;
