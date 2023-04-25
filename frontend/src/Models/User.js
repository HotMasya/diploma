// Modules
import reduce from 'lodash/reduce';

// Models
import Student from './Student';
import Teacher from './Teacher';

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

    if (props.updatedAt) {
      this.updatedAt = new Date(props.updatedAt);
    }

    if (props.createdAt) {
      this.createdAt = new Date(props.createdAt);
    }
  }

  hasPermissions(...permissions) {
    if (!permissions.length) return true;

    const mergedPermissions = reduce(
      permissions,
      (acc, permission) => (acc |= permission),
      0
    );

    return (this.permissions | mergedPermissions) === this.permissions;
  }

  get fullName() {
    return [this.firstName, this.lastName].filter(Boolean).join(' ');
  }

  get acronym() {
    return this.fullName
      .split(' ', 2)
      .map((item) => item[0])
      .join('');
  }
}

export default User;
