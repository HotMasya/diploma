// Modules
import isString from 'lodash/isString';

class Group {
  constructor(props) {
    this.name = props.name;
    this.id = props.id;

    if (isString(props.updatedAt)) {
      this.updatedAt = new Date(props.updatedAt);
    }

    if (isString(props.createdAt)) {
      this.createdAt = new Date(props.createdAt);
    }
  }
}

export default Group;
