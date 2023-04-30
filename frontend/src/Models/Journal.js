// Models
import Group from './Group';
import Teacher from './Teacher';

class Journal {
  constructor(props) {
    this.id = props.id;
    this.name = props.name;
    this.description = props.description;
    this.columns = props.columns;
    this.data = props.data;
    this.teacher = new Teacher(props.teacher);
    this.group = new Group(props.group);

    if (props.updatedAt) {
      this.updatedAt = new Date(props.updatedAt);
    }

    if (props.createdAt) {
      this.createdAt = new Date(props.createdAt);
    }
  }
}

export default Journal;
