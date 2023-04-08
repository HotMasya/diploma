// Modules
import { useCallback, useEffect } from 'react';
import { Form } from 'react-final-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';

// API
import API from 'API';

// Config
import { ROUTES } from 'Config/routes';

// Components
import SignIn from './sign-in';

// Helpers
import Auth from 'Helpers/auth';

const toasterErrorHandler = {
  render: ({ data }) => {
    return (
      <>
        <b>Сталася помилка!</b> {API.parseError(data).message}.
      </>
    );
  },
};

function SignInContainer() {
  const [pending, setPending] = useState(false);
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const token = params.get('verify');

  const handleSubmit = useCallback(
    ({ email, password }) => {
      setPending(true);

      const request = API.Auth.login(email, password)
        .then(({ accessToken }) => {
          Auth.logIn(accessToken);
          navigate(ROUTES.dashboard);
        })
        .finally(() => setPending(false));

      toast.promise(
        request,
        {
          pending: 'Авторизуємо вас...',
          error: toasterErrorHandler,
        },
        {
          autoClose: 3000,
          toastId: 'auth-toast',
        }
      );
    },
    [navigate]
  );

  const handleCreateAccount = useCallback(() => {
    navigate(ROUTES.signUp);
  }, [navigate]);

  useEffect(() => {
    if (token) {
      const request = API.Auth.verify(token);

      toast.promise(request, {
        success:
          'Ваша пошта була підтверджена. Тепер ви можете авторизуватись.',
        pending: 'Підтверджуємо вашу пошту...',
        error: {
          render: ({ data }) => (
            <>
              <b>Сталася помилка!</b> {API.parseError(data).message}.
            </>
          ),
        },
      }, {
        autoClose: 5000,
        toastId: 'verify-email-toast',
      });
    }
  }, [token]);

  return (
    <Form
      component={SignIn}
      onCreateAccount={handleCreateAccount}
      onSubmit={handleSubmit}
      pending={pending}
    />
  );
}

export default SignInContainer;
