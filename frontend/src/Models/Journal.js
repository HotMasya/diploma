// Models
import Group from './Group';
import Teacher from './Teacher';

class Journal {
  constructor(props) {
    this.id = props.id;
    this.name = props.name;
    this.description = props.description;
    this.columns = props.columns;
    this.rows = props.rows;
    this.teacher = props.teacher ? new Teacher(props.teacher) : null;
    this.group = props.group ? new Group(props.group) : null;

    if (props.updatedAt) {
      this.updatedAt = new Date(props.updatedAt);
    }

    if (props.createdAt) {
      this.createdAt = new Date(props.createdAt);
    }
  }

  get acronym() {
    return this.name
      .split(' ', 3)
      .map((item) => item[0].toUpperCase())
      .join('');
  }
}

export default Journal;
