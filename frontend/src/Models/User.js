// Modules
import reduce from 'lodash/reduce';

// Models
import Student from './Student';
import Teacher from './Teacher';
import { PERMISSION } from 'Constants/permission';

class User {
  constructor(props) {
    this.firstName = props.firstName;
    this.lastName = props.lastName;
    this.id = props.id;
    this.permissions = props.permissions;
    this.verified = props.verified;
    this.email = props.email;
    this.student = props.student ? new Student(props.student) : null;
    this.teacher = props.teacher ? new Teacher(props.teacher) : null;
    this.avatarUrl = props.avatarUrl;

    if (props.updatedAt) {
      this.updatedAt = new Date(props.updatedAt);
    }

    if (props.createdAt) {
      this.createdAt = new Date(props.createdAt);
    }
  }

  hasPermissions(...permissions) {
    if (!permissions.length || this.isAdmin) return true;

    return this.hasPermissionsNA(permissions);
  }

  /**
   * Check for permissions not including admin
   * @param  {...number} permissions
   * @returns {boolean}
   */
  hasPermissionsNA(...permissions) {
    const mergedPermissions = reduce(
      permissions,
      (acc, permission) => (acc |= permission),
      0
    );

    return (this.permissions | mergedPermissions) === this.permissions;
  }

  get fullName() {
    return [this.lastName, this.firstName].filter(Boolean).join(' ');
  }

  get isAdmin() {
    return (this.permissions | PERMISSION.ADMIN) === this.permissions;
  }

  get acronym() {
    return this.fullName
      .split(' ', 2)
      .map((item) => item[0].toUpperCase())
      .join('');
  }
}

export default User;
