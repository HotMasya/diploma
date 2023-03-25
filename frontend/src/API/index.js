// Modules
import axios from 'axios';

// Api
import Users from './endpoints/user';
import Auth from './endpoints/auth';

// Config
import { BASE_URLS } from '../Config/routes';

const instance = axios.create({
  baseURL: BASE_URLS.API,
  headers: {
    Authorization: localStorage.getItem('access_token') ?? '',
  },
});

const api = {
  instance,
  Auth,
  Users,
};

export default api;
