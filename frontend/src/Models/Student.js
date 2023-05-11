// Models
import User from './User';
import Group from './Group';
import Faculty from './Faculty';

class Student {
  constructor(props) {
    this.id = props.id;
    this.faculty = props.faculty ? new Faculty(props.faculty) : null;
    this.group = props.group ? new Group(props.group) : null;
    this.user = props.user ? new User(props.user) : null;

    if (props.updatedAt) {
      this.updatedAt = new Date(props.updatedAt);
    }

    if (props.createdAt) {
      this.createdAt = new Date(props.createdAt);
    }
  }
}

export default Student;
