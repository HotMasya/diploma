// Modules
import isString from 'lodash/isString';
import reduce from 'lodash/reduce';

class User {
  constructor(props) {
    this.firstName = props.firstName;
    this.lastName = props.lastName;
    this.id = props.id;
    this.permissions = props.permissions;

    if (isString(props.updatedAt)) {
      this.updatedAt = new Date(props.updatedAt);
    }

    if (isString(props.createdAt)) {
      this.createdAt = new Date(props.createdAt);
    }
  }

  hasPermissions(...permissions) {
    const mergedPermissions = reduce(
      permissions,
      (acc, permission) => (acc |= permission),
      0,
    );

    return (this.permissions | mergedPermissions) === this.permissions;
  }
}

export default User;
