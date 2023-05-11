// Modules
import { useCallback, useState } from 'react';
import { Field } from 'react-final-form';

// API
import API from 'API';

// Components
import SearchableFormSelect from 'Components/SearchableFormSelect';
import Button, { BUTTON_VARIANT } from 'Components/Button';
import RemoveStudentDialog from '../RemoveStudentDialog';

// Constants
import { PERMISSION } from 'Constants/permission';

// Context
import { useUserContext } from 'Context/UserContext';

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
  const { onDelete, user } = props;

  const [currentUser] = useUserContext();

  const [removeModalOpen, setRemoveModalOpen] = useState(false);

  const openRemoveModal = useCallback(() => setRemoveModalOpen(true), []);
  const closeRemoveModal = useCallback(() => setRemoveModalOpen(false), []);

  return (
    <>
      <h2 className={styles.title}>Інформація про студента</h2>
      <p className={styles.description}>
        Тут можна змінити основну інформацію, що стосується цього користувача,
        як студента.
        {!!user.student?.group &&
          currentUser?.hasPermissions(PERMISSION.UPDATE_USERS) && (
            <>
              <br /> <br />
              <b>Увага!</b> При зміні чи видаленні групи, цей користувач може
              втратити дані у&nbsp;
              <b>всіх журналах</b>, що пов'язані з його поточною групою (
              {user.student.group.name}).
            </>
          )}
      </p>
      <div className={styles.pair}>
        <Field
          component={SearchableFormSelect}
          disabled={!currentUser?.hasPermissions(PERMISSION.UPDATE_USERS)}
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
          disabled={!currentUser?.hasPermissions(PERMISSION.UPDATE_USERS)}
          formatOption={formatOption}
          labelText="Факультет"
          mapToOption={mapFactultyToOption}
          name="student.faculty"
          placeholder="Виберіть факультет"
          request={API.Faculties.findAll}
          title="Виберіть факультет"
        />
      </div>

      {currentUser?.hasPermissions(PERMISSION.UPDATE_USERS) && (
        <Button onClick={openRemoveModal} variant={BUTTON_VARIANT.destructive}>
          Видалити студента
        </Button>
      )}

      {removeModalOpen && (
        <RemoveStudentDialog
          onClose={closeRemoveModal}
          onRemove={onDelete}
          user={user}
        />
      )}
    </>
  );
}

export default StudentBlock;
