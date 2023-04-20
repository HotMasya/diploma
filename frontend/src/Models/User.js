// Modules
import isString from 'lodash/isString';
import reduce from 'lodash/reduce';

class User {
  constructor(props) {
    this.firstName = props.firstName;
    this.lastName = props.lastName;
    this.id = props.id;
    this.permissions = props.permissions;
    this.verified = props.verified;
    this.email = props.email;

    if (isString(props.updatedAt)) {
      this.updatedAt = new Date(props.updatedAt);
    }

    if (isString(props.createdAt)) {
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
