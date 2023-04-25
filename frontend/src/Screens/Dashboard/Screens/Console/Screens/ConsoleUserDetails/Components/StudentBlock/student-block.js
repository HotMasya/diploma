// Modules
import { Field } from 'react-final-form';

// API
import API from 'API';

// Components
import SearchableFormSelect from 'Components/SearchableFormSelect';
import Button, { BUTTON_VARIANT } from 'Components/Button';

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

function StudentBlock(props) {
  const { onDelete } = props;

  return (
    <>
      <h2 className={styles.title}>Інформація про студента</h2>
      <div className={styles.pair}>
        <Field
          component={SearchableFormSelect}
          labelText="Група"
          name="student.group"
          placeholder="Виберіть групу"
          request={API.Groups.findAll}
          title="Виберіть групу"
        />
      </div>
      <div className={styles.pair}>
        <Field
          component={SearchableFormSelect}
          formatOption={formatOption}
          labelText="Факультет"
          mapToOption={mapFactultyToOption}
          name="student.faculty"
          placeholder="Виберіть факультет"
          request={API.Faculties.findAll}
          title="Виберіть факультет"
        />
      </div>

      <Button onClick={onDelete} variant={BUTTON_VARIANT.destructive}>
        Видалити студента
      </Button>
    </>
  );
}

export default StudentBlock;
