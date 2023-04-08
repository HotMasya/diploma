// Api
import API from 'API';

async function login(email, password) {
  return API.instance.post('auth/login', { email, password })
    .then((res) => res.data);
}

async function verify(token) {
  return API.instance.post('auth/verify', { token });
}

async function loginWithGoogle() {
  return API.instance.get('auth/google');
}

const auth = {
  loginWithGoogle,
  login,
  verify,
};

export default auth;
