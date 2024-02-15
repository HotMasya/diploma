// Api
import API from 'API';

async function login(email, password) {
  return API.instance.post('auth/login', { email, password })
    .then((res) => res.data);
}

async function loginWithGoogle(data) {
  return API.instance.post('auth/login/google', data)
    .then((res) => res.data);
}

async function verify(token) {
  return API.instance.post('email/verify', { token });
}

const auth = {
  login,
  loginWithGoogle,
  verify,
};

export default auth;
