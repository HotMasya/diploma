// Modules
import { Field } from 'react-final-form';

// API
import API from 'API';

// Components
import SearchableFormSelect from 'Components/SearchableFormSelect';

// Styles
import styles from '../../styles.module.scss';

const mapFactultyToOption = ({ id, name, shortName }) => ({
  value: id,
  label: name,
  shortName,
});

const formatOption = ({ value, label, shortName }) => (
  <span className={styles.faculty}>
    <span title={label}>{label}</span>
    <span>{shortName}</span>
  </span>
);

function StudentBlock() {
  return (
    <>
      <h2 className={styles.title}>Інформація про студента</h2>
      <div className={styles.pair}>
        <Field
          component={SearchableFormSelect}
          labelText="Група"
          name="group"
          placeholder="Виберіть групу"
          request={API.Groups.findAll}
          title="Виберіть групу"
        />
      </div>

      <Field
        component={SearchableFormSelect}
        formatOption={formatOption}
        labelText="Факультет"
        mapToOption={mapFactultyToOption}
        name="faculty"
        placeholder="Виберіть факультет"
        request={API.Faculties.findAll}
        title="Виберіть факультет"
      />
    </>
  );
}

export default StudentBlock;
