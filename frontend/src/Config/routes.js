const { freeze } = Object;

export const BASE_URLS = freeze({
  API: process.env.REACT_APP_API_BASE_URL,
});

export const ROUTES = freeze({
  auth: '/auth',
  signUp: '/auth/signup',
  congratulations: '/auth/congratulations',

  dashboard: '/dashboard',
  console: '/dashboard/console',
});

export const GOOGLE_OAUTH_URL = `${BASE_URLS.API}/auth/google`;
