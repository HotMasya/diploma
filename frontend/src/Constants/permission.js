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

  CREATE_FACULTIES: 1 << 9,
  READ_FACULTIES: 1 << 10,
  UPDATE_FACULTIES: 1 << 11,
  DELETE_FACULTIES: 1 << 12,

  CREATE_DEPARTMENTS: 1 << 13,
  READ_DEPARTMENTS: 1 << 14,
  UPDATE_DEPARTMENTS: 1 << 15,
  DELETE_DEPARTMENTS: 1 << 16,
});

export const PERMISSION_GROUPS = Object.freeze([
  {
    description:
      'Дозволяє додавати нових користувачів, а також редагувати та видаляти вже існуючих. Редагувати можна буде персональні дані користувача, права, дані про студента і дані про викладача',
    name: 'Керування користувачами',
    fields: [
      { labelText: 'Створювати користувачів', name: 'CREATE_USERS' },
      { labelText: 'Переглядати користувачів', name: 'READ_USERS' },
      { labelText: 'Оновлювати користувачів', name: 'UPDATE_USERS' },
      { labelText: 'Видаляти користувачів', name: 'DELETE_USERS' },
    ],
  },
  {
    description:
      'Дозволяє створювати нові групи, а також редагувати і видаляти існуючі. Також дозволяє вибирати куратора групи серед існуючих викладачів, і керувати складом групи: додавати та видаляти студентів.',
    name: 'Керування групами',
    fields: [
      { labelText: 'Створювати групи', name: 'CREATE_GROUPS' },
      { labelText: 'Переглядати групи', name: 'READ_GROUPS' },
      { labelText: 'Оновлювати групи', name: 'UPDATE_GROUPS' },
      { labelText: 'Видаляти групи', name: 'DELETE_GROUPS' },
    ],
  },
  {
    description: 'Дозволяє створювати, редагувати та видаляти факультети.',
    name: 'Керування факультетами',
    fields: [
      { labelText: 'Створювати факультети', name: 'CREATE_FACULTIES' },
      { labelText: 'Переглядати факультети', name: 'READ_FACULTIES' },
      { labelText: 'Оновлювати факультети', name: 'UPDATE_FACULTIES' },
      { labelText: 'Видаляти факультети', name: 'DELETE_FACULTIES' },
    ],
  },
  {
    description: 'Дозволяє створювати, редагувати та видаляти кафедри.',
    name: 'Керування кафедрами',
    fields: [
      { labelText: 'Створювати кафедри', name: 'CREATE_DEPARTMENTS' },
      { labelText: 'Переглядати кафедри', name: 'READ_DEPARTMENTS' },
      { labelText: 'Оновлювати кафедри', name: 'UPDATE_DEPARTMENTS' },
      { labelText: 'Видаляти кафедри', name: 'DELETE_DEPARTMENTS' },
    ],
  },
]);
