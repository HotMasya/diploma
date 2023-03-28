export enum Permission {
  // Users
  ANY = 0,
  ADMIN = 1,
  READ = 1 << 1,
  UPDATE = 1 << 2,
}
