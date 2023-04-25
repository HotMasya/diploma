// Modules
import map from 'lodash/map';

// Models
import User from './User';
import Group from './Group';
import Department from './Department';

class Teacher {
  constructor(props) {
    this.id = props.id;
    this.groups = [];
    this.departments = [];
    this.user = props.user ? new User(props.user) : null;

    if (props.departments) {
      this.departments = map(props.departments, (d) => new Department(d));
    }

    if (props.groups) {
      this.groups = map(props.groups, (d) => new Group(d));
    }

    if (props.updatedAt) {
      this.updatedAt = new Date(props.updatedAt);
    }

    if (props.createdAt) {
      this.createdAt = new Date(props.createdAt);
    }
  }
}

export default Teacher;
