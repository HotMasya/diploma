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
  consoleUsers: '/dashboard/console/users',
  consoleUsersDetails: '/dashboard/console/users/:userId',
  consoleUsersDelete: '/dashboard/console/users/:userId/delete',
  consoleDepartments: '/dashboard/console/departments',
  consoleFaculties: '/dashboard/console/faculties',
  consoleGroups: '/dashboard/console/groups',
});

export const GOOGLE_OAUTH_URL = `${BASE_URLS.API}/auth/google`;
