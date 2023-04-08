export enum Permission {
  // Users
  ANY = 0,
  ADMIN = 1,

  // Managing users
  CREATE_USERS = 1 << 1,
  UPDATE_USERS = 1 << 2,
  DELETE_USERS = 1 << 3,
  MANAGE_USERS = CREATE_USERS | UPDATE_USERS | DELETE_USERS,
}
