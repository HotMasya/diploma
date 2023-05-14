// Modules
import { redirect } from 'react-router-dom';
import axios from 'axios';

// Api
import Admin from './endpoints/admin';
import Auth from './endpoints/auth';
import Departments from './endpoints/departments';
import Faculties from './endpoints/factulties';
import Groups from './endpoints/groups';
import Journals from './endpoints/journals';
import Logs from './endpoints/logs';
import Users from './endpoints/users';
import Students from './endpoints/students';
import Teachers from './endpoints/teachers';

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
  Departments,
  Faculties,
  Groups,
  Journals,
  Logs,
  Students,
  Teachers,
  Users,
};

export default api;
