// Modules
import assign from 'lodash/assign';
import isString from 'lodash/isString';
import reduce from 'lodash/reduce';

class User {
  constructor(props) {
    assign(this, props);

    if (isString(this.updatedAt)) {
      this.updatedAt = new Date(this.updatedAt);
    }

    if (isString(this.createdAt)) {
      this.createdAt = new Date(this.createdAt);
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
