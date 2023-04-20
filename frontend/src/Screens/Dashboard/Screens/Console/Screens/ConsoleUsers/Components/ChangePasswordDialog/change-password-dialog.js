// Modules
import { useOutletContext } from 'react-router-dom';
import { Field, Form } from 'react-final-form';
import { toast } from 'react-toastify';
import { useCallback, useRef, useState } from 'react';
import get from 'lodash/get';

// API
import API from 'API';

// Components
import Button, { BUTTON_VARIANT } from 'Components/Button';
import Dialog from 'Components/Dialog/dialog';
import FormInput from 'Components/FormInput';

// Helpers
import { isPassword } from 'Helpers/isPassword';

// Styles
import styles from './styles.module.scss';

const validateForm = ({ password, repeatPassword }) => {
  if (password !== repeatPassword) {
    return {
      repeatPassword: 'Паролі мають співпадати.',
    };
  }
};

function ChangePasswordDialog(props) {
  const { onClose } = props;

  const [pending, setPending] = useState(false);

  const modalRef = useRef();
  const [outletContext] = useOutletContext();

  const user = get(outletContext, 'user');
  const userId = get(user, 'id');

  const handleSubmit = useCallback(
    ({ password }) => {
      setPending(true);

      const request = API.Users.changePassword(userId, password)
        .then(() => {
          modalRef.current.close();
        })
        .finally(() => setPending(false));

      toast.promise(
        request,
        {
          success: 'Пароль користувача був успішно змінений.',
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
          toastId: 'change-user-passoword',
        }
      );
    },
    [userId]
  );

  if (!user) return null;

  const description = (
    <>
      Змінити пароль для користувача <b>{user.fullName}</b>. Новий пароль буде
      надіслано на електронну пошту.
    </>
  );

  return (
    <Dialog
      description={description}
      onClose={onClose}
      pending={pending}
      ref={modalRef}
      title="Змінити пароль"
    >
      <Form
        onSubmit={handleSubmit}
        validate={validateForm}
        render={({ handleSubmit }) => (
          <form className={styles.form} noValidate onSubmit={handleSubmit}>
            <Field
              component={FormInput}
              labelText="Новий пароль"
              name="password"
              placeholder="Введіть пароль"
              type="password"
              validate={isPassword()}
            />
            <Field
              component={FormInput}
              labelText="Повторіть пароль"
              name="repeatPassword"
              placeholder="Повторіть новий пароль"
              type="password"
            />
            <div className={styles.buttons}>
              <Button type="submit">Змінити</Button>
              <Button
                onClick={() => modalRef.current.close()}
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

export default ChangePasswordDialog;
