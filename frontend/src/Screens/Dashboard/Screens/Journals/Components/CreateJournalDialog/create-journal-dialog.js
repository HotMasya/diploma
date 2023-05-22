// Modules
import { useCallback, useMemo, useRef, useState } from 'react';
import { generatePath, useNavigate, useOutletContext } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Form, Field } from 'react-final-form';
import get from 'lodash/get';
import isArray from 'lodash/isArray';

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
import { createDefaultColumns } from '../../Helpers/createDefaultColumns';
import { createDefaultRows } from '../../Helpers/createDefaultRows';

// Styles
import styles from './styles.module.scss';

function CreateJournalDialog(props) {
  const { columns, onClose, onEdit } = props;

  const [pending, setPending] = useState(false);
  const context  = useOutletContext();
  const modalRef = useRef();
  const navigate = useNavigate();

  const outletContext = get(context, [0]);
  const journal = get(outletContext, 'journal');

  const name = get(journal, 'name');
  const description = get(journal, 'description');
  const id = get(journal, 'id');

  const isEditMode = Boolean(id);

  const initialValues = useMemo(
    () => ({
      name: name || '',
      description: description || '',
    }),
    [description, name]
  );

  const handleSubmit = useCallback(
    async (values) => {
      setPending(true);

      const data = {
        name: values.name,
        description: values.description,
      };

      if (values.group?.value) {
        data.groupId = values.group.value;

        const students = await API.Students.findAll({
          groupId: Number(data.groupId),
        });

        data.columns = isArray(columns) ? columns : createDefaultColumns();
        data.rows = createDefaultRows(students);
      }

      const request = isEditMode
        ? API.Journals.partialUpdate(id, values).then(() => {
            onEdit();
            modalRef.current.close();
          })
        : API.Journals.create(data).then((journal) => {
            const path = generatePath(ROUTES.journalDetails, {
              journalId: journal.id,
            });
            modalRef.current.close();
            navigate(path);
          });

      request.finally(() => setPending(false));

      toast.promise(
        request,
        {
          success: isEditMode
            ? 'Інформацію про журнал було успішно оновлено'
            : 'Журнал був успішно створений',
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
          toastId: isEditMode ? 'edit-journal' : 'create-journal',
        }
      );
    },
    [columns, id, isEditMode, navigate, onEdit]
  );

  const title = isEditMode ? 'Редагувати журнал' : 'Створити журнал';
  const modalDescription = isEditMode ? (
    <>
      Редагування журналу <b>{name}</b> для групи <b>{journal.group.name}</b>
    </>
  ) : isArray(columns) ? (
    'Для вказаної групи буде створено новий журнал із конфігурацією поточного журналу. Конфігурацію також можна буде редагувати після створення журналу.'
  ) : (
    'Для вказаної групи буде створено новий журнал, який пізніше можна буде детально налаштувати під ваші потреби.'
  );

  return (
    <Dialog
      description={modalDescription}
      onClose={onClose}
      pending={pending}
      ref={modalRef}
      title={title}
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

            {!isEditMode && (
              <Field
                component={SearchableFormSelect}
                labelText="Група"
                name="group"
                placeholder="Виберіть групу"
                request={API.Groups.findAll}
                title="Виберіть групу"
                validate={isRequired()}
              />
            )}

            <div className={styles.buttons}>
              <Button type="submit">
                {isEditMode ? 'Зберегти' : 'Створити'}
              </Button>
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
