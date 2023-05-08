// Modules
import { Field } from 'react-final-form';
import { useCallback, useState } from 'react';

// API
import API from 'API';

// Components
import SearchableFormSelect from 'Components/SearchableFormSelect';
import Button, { BUTTON_VARIANT } from 'Components/Button';
import RemoveTeacherDialog from '../RemoveTeacherDialog';

// Constants
import { PERMISSION } from 'Constants/permission';

// Context
import { useUserContext } from 'Context/UserContext';

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

function TeacherBlock(props) {
  const { onDelete, user } = props;

  const [currentUser] = useUserContext();

  const [removeModalOpen, setRemoveModalOpen] = useState(false);

  const openRemoveModal = useCallback(() => setRemoveModalOpen(true), []);
  const closeRemoveModal = useCallback(() => setRemoveModalOpen(false), []);

  return (
    <>
      <h2 className={styles.title}>Інформація про викладача</h2>
      <p className={styles.description}>
        Тут можна змінити основну інформацію, що стосується цього користувача,
        як викладача.
      </p>
      <div className={styles.pair}>
        <Field
          component={SearchableFormSelect}
          disabled={!currentUser?.hasPermissions(PERMISSION.UPDATE_USERS)}
          formatMultiValue={formatMultiValue}
          formatOption={formatOption}
          labelText="Кафедри"
          mapToOption={mapFacultyToOption}
          name="teacher.departments"
          placeholder="Виберіть кафедри"
          request={API.Departments.findAll}
          title="Виберіть кафедри"
        />
      </div>
      {currentUser?.hasPermissions(PERMISSION.UPDATE_USERS) && (
        <Button onClick={openRemoveModal} variant={BUTTON_VARIANT.destructive}>
          Видалити викладача
        </Button>
      )}

      {removeModalOpen && (
        <RemoveTeacherDialog
          onClose={closeRemoveModal}
          onRemove={onDelete}
          user={user}
        />
      )}
    </>
  );
}

export default TeacherBlock;
