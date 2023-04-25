class Department {
  constructor(props) {
    this.name = props.name;
    this.shortName = props.shortName;
    this.id = props.id;

    if (props.updatedAt) {
      this.updatedAt = new Date(props.updatedAt);
    }

    if (props.createdAt) {
      this.createdAt = new Date(props.createdAt);
    }
  }
}

export default Department;
