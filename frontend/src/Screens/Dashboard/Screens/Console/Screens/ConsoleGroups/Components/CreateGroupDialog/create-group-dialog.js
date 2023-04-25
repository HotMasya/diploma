// Modules
import { useCallback, useRef, useState } from 'react';
import { Field, Form } from 'react-final-form';
import { toast } from 'react-toastify';
import { generatePath, useNavigate } from 'react-router-dom';

// API
import API from 'API';

// Components
import Dialog from 'Components/Dialog';
import FormInput from 'Components/FormInput/form-input';
import Button, { BUTTON_VARIANT } from 'Components/Button';

// Config
import { ROUTES } from 'Config/routes';

// Styles
import styles from './styles.module.scss';

function CreateGroupDialog(props) {
  const { onClose } = props;

  const [pending, setPending] = useState(false);

  const navigate = useNavigate();

  const modalRef = useRef();

  const handleSubmit = useCallback(
    (name) => {
      if (pending) return;

      setPending(true);

      const request = API.Groups.create({ name })
        .then((group) => {
          const path = generatePath(ROUTES.consoleGroupsDetails, {
            groupId: group.id,
          });
          navigate(path);
        })
        .finally(() => setPending(false));

      toast.promise(
        request,
        {
          success: 'Група була успішно створена',
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
          toastId: 'create-group',
        }
      );
    },
    [navigate, pending]
  );

  return (
    <Dialog
      description="Буде створена порожня група без студентів та куратора. Додати студентів або куратора можна буде в детальному налаштуванні."
      onClose={onClose}
      pending={pending}
      ref={modalRef}
      title="Створити нову групу"
    >
      <Form onSubmit={handleSubmit}>
        {({ handleSubmit }) => (
          <form className={styles.form} onSubmit={handleSubmit}>
            <Field
              component={FormInput}
              labelText="Назва"
              name="name"
              placeholder="Вкажіть назву групи"
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
      </Form>
    </Dialog>
  );
}

export default CreateGroupDialog;
