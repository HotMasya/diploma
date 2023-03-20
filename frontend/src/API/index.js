// Modules
import axios from 'axios';

// Api
import Users from './endpoints/user';

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
  Users,
};

export default api;
