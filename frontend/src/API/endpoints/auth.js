// Api
import API from 'API';

async function login(email, password) {
  return API.instance.post('auth/login', { email, password })
    .then((res) => res.data);
}

const auth = {
  login,
};

export default auth;
