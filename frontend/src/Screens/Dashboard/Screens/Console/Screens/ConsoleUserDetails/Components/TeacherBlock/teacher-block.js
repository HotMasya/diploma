// Modules
import { Field } from 'react-final-form';

// API
import API from 'API';

// Components
import SearchableFormSelect from 'Components/SearchableFormSelect';

// Styles
import styles from '../../styles.module.scss';

const mapFacultyToOption = ({ id, name, shortName }) => ({
  value: id,
  label: name,
  shortName,
});

const formatMultiValue = ({ label, shortName }) => shortName || label;

const formatOption = ({ label, shortName }) => (
  <span className={styles.faculty}>
    <span title={label}>{label}</span>
    <span>{shortName}</span>
  </span>
);

function TeacherBlock() {
  return (
    <>
      <h2 className={styles.title}>Інформація про викладача</h2>
      <div className={styles.pair}>
        <Field
          component={SearchableFormSelect}
          formatMultiValue={formatMultiValue}
          formatOption={formatOption}
          labelText="Кафедри"
          mapToOption={mapFacultyToOption}
          name="departments"
          placeholder="Виберіть кафедри"
          request={API.Departments.findAll}
          title="Виберіть кафедри"
        />
      </div>
    </>
  );
}

export default TeacherBlock;
