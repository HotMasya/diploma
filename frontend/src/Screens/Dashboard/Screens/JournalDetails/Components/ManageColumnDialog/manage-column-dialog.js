// Modules
import { Field, Form } from 'react-final-form';
import get from 'lodash/get';
import { useCallback, useMemo, useRef } from 'react';
import { v4 as uuid } from 'uuid';
import PropTypes from 'prop-types';

// Components
import Button, { BUTTON_VARIANT } from 'Components/Button';
import Dialog from 'Components/Dialog';
import FormInput from 'Components/FormInput';
import Checkbox from 'Components/Checkbox/checkbox';

// Context
import { useJournalContext } from 'Context/JournalContext';

// Helpers
import { isRequired } from 'Helpers/isRequired';

// Styles
import styles from './styles.module.scss';

function ManageColumnDialog(props) {
  const { onClose, onCreate, onDelete, onSave } = props;

  const [journalContext] = useJournalContext();
  const modalRef = useRef();

  const column = get(journalContext, 'column');

  const initialValues = useMemo(
    () => ({
      title: get(column, 'title', ''),
      visibleForStudents: get(column, 'visibleForStudents', true),
    }),
    [column]
  );

  const isEditMode = !!column;

  const handleSubmit = useCallback(
    (values) => {
      const result = {
        id: column?.id || uuid(),
        editable: true,
        title: values.title,
        visibleForStudents: values.visibleForStudents,
      };

      if (isEditMode) {
        onSave(result);
      } else {
        onCreate(result);
      }

      modalRef.current.close();
    },
    [column?.id, isEditMode, onCreate, onSave]
  );

  const title = isEditMode ? 'Редагувати стовпчик' : 'Додати стовпчик';

  return (
    <Dialog onClose={onClose} ref={modalRef} title={title}>
      <Form
        onSubmit={handleSubmit}
        initialValues={initialValues}
        render={({ handleSubmit }) => (
          <form className={styles.form} onSubmit={handleSubmit}>
            <Field
              component={FormInput}
              name="title"
              labelText="Назва"
              placeholder="Вкажіть назву стовпчика"
              validate={isRequired()}
            />

            <Field
              name="visibleForStudents"
              type="checkbox"
              render={({ input }) => (
                <Checkbox labelText="Відображати для студентів" {...input} />
              )}
            />

            <div className={styles.buttons}>
              <Button type="submit">
                {isEditMode ? 'Зберегти' : 'Створити'}
              </Button>
              <Button
                onClick={() => modalRef.current.close()}
                type="button"
                variant={BUTTON_VARIANT.secondary}
              >
                Скасувати
              </Button>
            </div>
          </form>
        )}
      />
    </Dialog>
  );
}

ManageColumnDialog.propTypes = {
  onClose: PropTypes.func,
  onCreate: PropTypes.func,
  onDelete: PropTypes.func,
  onSave: PropTypes.func,
};

export default ManageColumnDialog;
