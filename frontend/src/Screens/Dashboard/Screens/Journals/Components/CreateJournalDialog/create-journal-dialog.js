// Modules
import { useCallback, useRef, useState } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Form, Field } from 'react-final-form';

// API
import API from 'API';

// Components
import Dialog from 'Components/Dialog';
import Button, { BUTTON_VARIANT } from 'Components/Button';
import SearchableFormSelect from 'Components/SearchableFormSelect';
import FormInput from 'Components/FormInput/form-input';
import FormTextArea from 'Components/FormTextArea/form-text-area';

// Config
import { ROUTES } from 'Config/routes';

// Helpers
import { isRequired } from 'Helpers/isRequired';

// Styles
import styles from './styles.module.scss';

function CreateJournalDialog(props) {
  const { onClose } = props;

  const [pending, setPending] = useState(false);
  const modalRef = useRef();
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    (values) => {
      setPending(true);

      const data = {
        name: values.name,
        description: values.description,
        groupId: values.group.value,
      };

      const request = API.Journals.create(data)
        .then((journal) => {
          const path = generatePath(ROUTES.journalDetails, {
            journalId: journal.id,
          });
          navigate(path);
        })
        .finally(() => setPending(false));

      toast.promise(
        request,
        {
          success: 'Журнал був успішно створений',
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
          toastId: 'create-journal',
        }
      );
    },
    [navigate]
  );

  return (
    <Dialog
      description="Для вказаної групи буде створено новий журнал, який пізніше можна буде детально налаштувати під ваші потреби."
      onClose={onClose}
      pending={pending}
      ref={modalRef}
      title="Створити журнал"
    >
      <Form
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

            <Field
              component={SearchableFormSelect}
              labelText="Група"
              name="group"
              placeholder="Виберіть групу"
              request={API.Groups.findAll}
              title="Виберіть групу"
              validate={isRequired()}
            />

            <div className={styles.buttons}>
              <Button type="submit">Створити</Button>
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

export default CreateJournalDialog;
