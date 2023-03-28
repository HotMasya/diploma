// Modules
import axios from 'axios';

// Api
import Users from './endpoints/user';
import Auth from './endpoints/auth';

// Config
import { BASE_URLS } from '../Config/routes';

// Helpers
import AuthHelper from 'Helpers/auth';

const instance = axios.create({
  baseURL: BASE_URLS.API,
  headers: {
    Authorization: AuthHelper.token
      ? `Bearer ${AuthHelper.token}`
      : '',
  },
});

function updateAccessToken(token) {
  instance.defaults.headers['Authorization'] = `Bearer ${token}`;
  instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

const api = {
  // Internal
  instance,
  updateAccessToken,

  // Endpoints
  Auth,
  Users,
};

export default api;
