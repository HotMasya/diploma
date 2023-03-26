// Modules
import { Field } from 'react-final-form';

// Components
import FormInput from 'Components/FormInput';
import Button from 'Components/Button';

// Styles
import styles from './styles.module.scss';

function SignIn(props) {
  const { handleSubmit } = props;

  return (
    <form onSubmit={handleSubmit}>
      <Field
        component={FormInput}
        labelText="Електронна пошта"
        name="email"
        type="email"
      />
      <Field
        component={FormInput}
        labelText="Пароль"
        name="password"
        type="password"
      />
      <Button type="submit">Авторизуватись</Button>
    </form>
  );
}

export default SignIn;
