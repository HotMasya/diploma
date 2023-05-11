// Modules
import { useCallback, useState } from 'react';
import { Form } from 'react-final-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// API
import API from 'API';

// Config
import { ROUTES } from 'Config/routes';

// Components
import SignUp from './sign-up';

function validatePassword(values) {
  if (values.password !== values.repeatPassword) {
    return { repeatPassword: 'Паролі мають співпадати' };
  }

  return {};
}

const requestErrorHandler = {
  render({ data }) {
    return (
      <>
        <b>Сталася помилка!</b> {API.parseError(data).message}.
      </>
    );
  },
};

const requestPendingHandler = {
  render: () => (
    <>
      <b>Будь-ласка, зачекайте!</b> Обробляємо ващі дані...
    </>
  ),
};

function SignInContainer() {
  const navigate = useNavigate();
  const [pending, setPending] = useState(false);

  const handleSubmit = useCallback(
    (values) => {
      setPending(true);

      const { repeatPassword: _, ...data } = values;

      const request = API.Users.create(data)
        .then(() => {
          navigate(ROUTES.congratulations, { state: { verification: true } });
        })
        .finally(() => setPending(false));

      toast.promise(
        request,
        {
          pending: requestPendingHandler,
          error: requestErrorHandler,
        },
        {
          autoClose: 5000,
        }
      );
    },
    [navigate]
  );

  const handleLogin = useCallback(() => {
    navigate(ROUTES.auth);
  }, [navigate]);

  return (
    <Form
      component={SignUp}
      onLogin={handleLogin}
      onSubmit={handleSubmit}
      pending={pending}
      validate={validatePassword}
    />
  );
}

export default SignInContainer;
