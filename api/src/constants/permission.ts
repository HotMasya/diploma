export enum Permission {
  // Users
  ANY = 0,
  ADMIN = 1,

  // Managing users
  CREATE_USERS = 1 << 1,
  READ_USERS = 1 << 2,
  UPDATE_USERS = 1 << 3,
  DELETE_USERS = 1 << 4,
  MANAGE_USERS = CREATE_USERS | READ_USERS | UPDATE_USERS | DELETE_USERS,

  // Managing groups
  CREATE_GROUPS = 1 << 5,
  READ_GROUPS = 1 << 6,
  UPDATE_GROUPS = 1 << 7,
  DELETE_GROUPS = 1 << 8,
  MANAGE_GROUPS = CREATE_GROUPS | READ_GROUPS | UPDATE_GROUPS | DELETE_GROUPS,

  // Managing faculties
  CREATE_FACULTIES = 1 << 9,
  READ_FACULTIES = 1 << 10,
  UPDATE_FACULTIES = 1 << 11,
  DELETE_FACULTIES = 1 << 12,
  MANAGE_FACULTIES = CREATE_FACULTIES |
    READ_FACULTIES |
    UPDATE_FACULTIES |
    DELETE_FACULTIES,

  // Managing departments
  CREATE_DEPARTMENTS = 1 << 13,
  READ_DEPARTMENTS = 1 << 14,
  UPDATE_DEPARTMENTS = 1 << 15,
  DELETE_DEPARTMENTS = 1 << 16,
  MANAGE_DEPARTMENTS = CREATE_DEPARTMENTS |
    READ_DEPARTMENTS |
    UPDATE_DEPARTMENTS |
    DELETE_DEPARTMENTS,
}
