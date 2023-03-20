const { freeze } = Object;

export const BASE_URLS = freeze({
  API: process.env.REACT_APP_API_BASE_URL,
});

export const ROUTES = freeze({
  signIn: 'signin',
  signUp: 'signup',
});
