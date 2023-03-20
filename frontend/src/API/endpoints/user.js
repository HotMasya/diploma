// Modules
import map from 'lodash/map';

// Api
import API from 'API';

// Models
import User from 'Models/User';

async function findAll(options) {
  return API.instance.get('users', { params: options })
    .then((res) => res.data)
    .then((data) => map(data, (d) => new User(d)));
}

const users = {
  findAll,
};

export default users;
