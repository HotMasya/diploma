// Models
import Journal from './Journal';
import Student from './Student';
import Teacher from './Teacher';

class Log {
  constructor(props) {
    this.id = props.id;
    this.columnId = props.columnId;
    this.index = props.index;
    this.message = props.message;
    this.columnTitle = props.columnTitle;

    this.journal = props.journal ? new Journal(props.journal) : null;
    this.teacher = props.teacher ? new Teacher(props.teacher) : null;
    this.student = props.student ? new Student(props.student) : null;

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

export default Log;
