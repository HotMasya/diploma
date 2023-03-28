// Modules
import { useCallback } from 'react';
import { Form } from 'react-final-form';
import { useNavigate } from 'react-router-dom';

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

function SignInContainer() {
  const navigate = useNavigate();

  const handleSubmit = useCallback((values) => {}, []);

  const handleLogin = useCallback(() => {
    navigate(ROUTES.auth);
  }, [navigate]);

  const handleGoogleAuth = useCallback(() => {

  }, []);

  return (
    <Form
      component={SignUp}
      onGoogleAuth={handleGoogleAuth}
      onLogin={handleLogin}
      onSubmit={handleSubmit}
      validate={validatePassword}
    />
  );
}

export default SignInContainer;
