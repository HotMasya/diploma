export const PERMISSION = Object.freeze({
  ADMIN: 1,
  CREATE_USERS: 1 << 1,
  UPDATE_USERS: 1 << 2,
  DELETE_USERS: 1 << 3,
});

export const PERMISSIONS_MAP = Object.freeze({
  ADMIN: 'Адміністратор',
  CREATE_USERS: 'Створювати користувачів',
  DELETE_USERS: 'Видаляти користувачів',
  UPDATE_USERS: 'Оновлювати користувачів',
});
