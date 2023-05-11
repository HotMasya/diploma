// Modules
import map from 'lodash/map';

// Models
import Teacher from './Teacher';
import Student from './Student';

class Group {
  constructor(props) {
    this.name = props.name;
    this.id = props.id;
    this.curator = null;
    this.studentsCount = props.studentsCount ?? 0;
    this.students = [];

    if (props.curator) {
      this.curator = new Teacher(props.curator);
    }

    if (props.students) {
      this.students = map(props.students, (s) => new Student(s));
    }

    if (props.updatedAt) {
      this.updatedAt = new Date(props.updatedAt);
    }

    if (props.createdAt) {
      this.createdAt = new Date(props.createdAt);
    }
  }

  get curatorFullName() {
    return this.curator?.user.fullName || '';
  }
}

export default Group;
