// Modules
import { toast } from 'react-toastify';
import { generatePath, useNavigate } from 'react-router-dom';
import { useCallback, useMemo, useRef, useState } from 'react';
import { Field, Form } from 'react-final-form';

// API
import API from 'API';

// Components
import Button, { BUTTON_VARIANT } from 'Components/Button';
import FormInput from 'Components/FormInput';
import Dialog from 'Components/Dialog';

// Helpers
import { isRequired } from 'Helpers/isRequired';
import { combineValidators } from 'Helpers/combineValidators';
import { isEmail } from 'Helpers/isEmail';
import { isPassword } from 'Helpers/isPassword';

// Styles
import styles from './styles.module.scss';
import { ROUTES } from 'Config/routes';

const validateForm = ({ password, repeatPassword }) => {
  if (password !== repeatPassword) {
    return { repeatPassword: 'Паролі не співпадають.' };
  }

  return {};
};

function CreateUserDialog(props) {
  const { onClose } = props;

  const [pending, setPending] = useState(false);
  const modalRef = useRef(null);
  const navigate = useNavigate();

  const initialValues = useMemo(
    () => ({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      repeatPassword: '',
    }),
    []
  );

  const handleSubmit = useCallback(
    (values) => {
      const { repeatPassword, ...data } = values;

      setPending(true);
      let request = API.Users.create(data);

      request
        .then((user) => {
          const path = generatePath(ROUTES.consoleUsersDetails, {
            userId: user.id,
          });
          navigate(path);
        })
        .finally(() => setPending(false));

      toast.promise(request, {
        success: 'Користувач був успішно створений',
        error: {
          render({ data }) {
            return (
              <>
                <b>Сталася помилка!</b> {API.parseError(data).message}.
              </>
            );
          },
        },
      });
    },
    [navigate]
  );

  return (
    <Dialog
      onClose={onClose}
      pending={pending}
      ref={modalRef}
      title="Додати користувача"
    >
      <Form
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validate={validateForm}
        render={({ handleSubmit }) => (
          <form className={styles.form} onSubmit={handleSubmit}>
            <Field
              component={FormInput}
              labelText="Ім'я"
              name="firstName"
              placeholder="Вкажіть ім'я"
              validate={isRequired()}
            />

            <Field
              component={FormInput}
              labelText="Прізвище"
              name="lastName"
              placeholder="Вкажіть прізвище"
              validate={isRequired()}
            />

            <Field
              component={FormInput}
              labelText="Електронна пошта"
              name="email"
              placeholder="Вкажіть електронну пошту"
              validate={combineValidators(isRequired(), isEmail())}
            />

            <Field
              component={FormInput}
              labelText="Пароль"
              name="password"
              placeholder="Вкажіть пароль"
              type="password"
              validate={isPassword()}
            />

            <Field
              component={FormInput}
              labelText="Повторіть пароль"
              name="repeatPassword"
              placeholder="Вкажіть пароль ще раз"
              type="password"
            />

            <div className={styles.buttons}>
              <Button type="submit">Додати</Button>
              <Button
                onClick={() => modalRef.current?.close()}
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

export default CreateUserDialog;
