export const PERMISSION = Object.freeze({
  ADMIN: 1,

  CREATE_USERS: 1 << 1,
  READ_USERS: 1 << 2,
  UPDATE_USERS: 1 << 3,
  DELETE_USERS: 1 << 4,

  CREATE_GROUPS: 1 << 5,
  READ_GROUPS: 1 << 6,
  UPDATE_GROUPS: 1 << 7,
  DELETE_GROUPS: 1 << 8,

  CREATE_FACULTIES: 1 << 6,
  READ_FACULTIES: 1 << 7,
  UPDATE_FACULTIES: 1 << 8,
  DELETE_FACULTIES: 1 << 9,

  CREATE_DEPARTMENTS: 1 << 10,
  READ_DEPARTMENTS: 1 << 11,
  UPDATE_DEPARTMENTS: 1 << 12,
  DELETE_DEPARTMENTS: 1 << 13,
});

export const PERMISSIONS_MAP = Object.freeze({
  ADMIN: 'Адміністратор',

  CREATE_USERS: 'Створювати користувачів',
  READ_USERS: 'Переглядати користувачів',
  DELETE_USERS: 'Видаляти користувачів',
  UPDATE_USERS: 'Оновлювати користувачів',

  CREATE_GROUPS: 'Створювати групи',
  READ_GROUPS: 'Переглядати групи',
  DELETE_GROUPS: 'Видаляти групи',
  UPDATE_GROUPS: 'Оновлювати групи',

  CREATE_FACULTIES: 'Створювати факультети',
  READ_FACULTIES: 'Переглядати факультети',
  DELETE_FACULTIES: 'Видаляти факультети',
  UPDATE_FACULTIES: 'Оновлювати факультети',

  CREATE_DEPARTMENTS: 'Створювати кафедри',
  READ_DEPARTMENTS: 'Переглядати кафедри',
  DELETE_DEPARTMENTS: 'Видаляти кафедри',
  UPDATE_DEPARTMENTS: 'Оновлювати кафедри',
});
