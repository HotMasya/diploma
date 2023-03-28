// Modules
import { useCallback } from 'react';
import { Form } from 'react-final-form';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

// API
import API from 'API';

// Config
import { ROUTES } from 'Config/routes';

// Components
import SignIn from './sign-in';

// Helpers
import Auth from 'Helpers/auth';

function SignInContainer() {
  const [pending, setPending] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    ({ email, password }) => {
      setPending(true);

      API.Auth.login(email, password)
        .then(({ accessToken }) => {
          Auth.logIn(accessToken);
          navigate(ROUTES.dashboard);
        })
        .catch((error) => {
          console.log(error.response);
        })
        .finally(() => setPending(false));
    },
    [navigate]
  );

  const handleCreateAccount = useCallback(() => {
    navigate(ROUTES.signUp);
  }, [navigate]);

  const handleGoogleAuth = useCallback(() => {

  }, []);

  return (
    <Form
      component={SignIn}
      onCreateAccount={handleCreateAccount}
      onGoogleAuth={handleGoogleAuth}
      onSubmit={handleSubmit}
    />
  );
}

export default SignInContainer;
