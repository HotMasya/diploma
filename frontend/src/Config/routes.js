const { freeze } = Object;

export const BASE_URLS = freeze({
  API: process.env.REACT_APP_API_BASE_URL,
});

export const ROUTES = freeze({
  auth: '/auth',
  signUp: '/auth/signup',
  congratulations: '/auth/congratulations',
  redirect: '/auth/redirect',

  dashboard: '/dashboard',

  grades: '/dashboard/grades',
  gradeDetails: '/dashboard/grades/:journalId',

  journals: '/dashboard/journals',
  journalDetails: '/journals/:journalId',

  console: '/dashboard/console',
  consoleUsers: '/dashboard/console/users',
  consoleUsersDetails: '/dashboard/console/users/:userId',

  consoleDepartments: '/dashboard/console/departments',

  consoleFaculties: '/dashboard/console/faculties',

  consoleGroups: '/dashboard/console/groups',
  consoleGroupsDetails: '/dashboard/console/groups/:groupId',
});
