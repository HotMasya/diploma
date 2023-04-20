// Modules
import { redirect } from 'react-router-dom';
import axios from 'axios';

// Api
import Users from './endpoints/user';
import Auth from './endpoints/auth';
import Admin from './endpoints/admin';

// Config
import { BASE_URLS, ROUTES } from '../Config/routes';

// Constants
import { HTTP_STATUS } from './constants';

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

instance.interceptors.response.use((response) => {
  if (response.status === HTTP_STATUS.unauthorized) {
    updateAccessToken(null);
    AuthHelper.logOut();
    return redirect(ROUTES.auth);
  }

  return response;
});

function updateAccessToken(token) {
  instance.defaults.headers['Authorization'] = token ? `Bearer ${token}` : '';
  instance.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : '';
}

/**
 * @param {import('axios').AxiosError} axiosError
 *
 * @returns {{ message: string, statusCode: number }} Error message and status code
 */
function parseError(axiosError) {
  return axiosError.response.data;
}

const api = {
  // Internal
  instance,
  updateAccessToken,
  parseError,

  // Endpoints
  Admin,
  Auth,
  Users,
};

export default api;
