// Modules
import { useCallback, useMemo, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { Form, Field } from 'react-final-form';
import get from 'lodash/get';

// API
import API from 'API';

// Components
import Dialog from 'Components/Dialog';
import Button, { BUTTON_VARIANT } from 'Components/Button';
import FormInput from 'Components/FormInput/form-input';
import FormTextArea from 'Components/FormTextArea/form-text-area';

// Helpers
import { isRequired } from 'Helpers/isRequired';

// Styles
import styles from './styles.module.scss';

function UpdateJournalDialog(props) {
  const { onClose, onEdit, journal } = props;

  const [pending, setPending] = useState(false);
  const modalRef = useRef();

  const name = get(journal, 'name');
  const description = get(journal, 'description');
  const id = get(journal, 'id');

  const initialValues = useMemo(
    () => ({
      name: name,
      description: description || '',
    }),
    [description, name]
  );

  const handleSubmit = useCallback(
    async (values) => {
      setPending(true);

      const request = API.Journals.partialUpdate(id, values).then(() => {
        onEdit(values);
        modalRef.current.close();
      });

      request.finally(() => setPending(false));

      toast.promise(
        request,
        {
          success: 'Інформацію про журнал було успішно оновлено',
          error: {
            render({ data }) {
              return (
                <>
                  <b>Сталася помилка!</b> {API.parseError(data).message}.
                </>
              );
            },
          },
        },
        {
          autoClose: 3000,
          toastId: 'update-journal',
        }
      );
    },
    [id, onEdit]
  );

  const modalDescription = (
    <>
      Редагування журналу <b>{name}</b> для групи <b>{journal.group.name}</b>
    </>
  );

  return (
    <Dialog
      description={modalDescription}
      onClose={onClose}
      pending={pending}
      ref={modalRef}
      title="Редагувати журнал"
    >
      <Form
        initialValues={initialValues}
        onSubmit={handleSubmit}
        render={({ handleSubmit }) => (
          <form className={styles.form} onSubmit={handleSubmit}>
            <Field
              component={FormInput}
              labelText="Назва"
              name="name"
              placeholder="Вкажіть назву"
              validate={isRequired()}
            />

            <Field
              component={FormTextArea}
              labelText="Опис (опціонально)"
              placeholder="Вкажіть опис, якщо треба"
              name="description"
            />

            <div className={styles.buttons}>
              <Button type="submit">Зберегти</Button>
              <Button
                onClick={() => modalRef.current?.close()}
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

export default UpdateJournalDialog;
