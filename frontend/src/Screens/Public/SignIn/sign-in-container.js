// Modules
import { useAuthService } from 'Hooks/useAuthService';
import { useCallback } from 'react';
import { Form } from 'react-final-form';

// Components
import SignIn from './sign-in';

function SignInContainer() {
  const { login } = useAuthService();

  const handleSubmit = useCallback(
    ({ email, password }) => {
      login(email, password);
    },
    [login]
  );

  return <Form component={SignIn} onSubmit={handleSubmit} />;
}

export default SignInContainer;
