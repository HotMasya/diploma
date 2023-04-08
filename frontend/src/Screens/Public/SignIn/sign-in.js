// Modules
import { Field } from 'react-final-form';
import { MdKey } from 'react-icons/md';
import { HiOutlineUserAdd } from 'react-icons/hi';

// Components
import FormInput from 'Components/FormInput';
import Button from 'Components/Button';
import GoogleAuthButton from 'Components/GoogleAuthButton/google-auth-button';

// Helpers
import { combineValidators } from 'Helpers/combineValidators';
import { isRequired } from 'Helpers/isRequired';
import { isEmail } from 'Helpers/isEmail';

// Constants
import { BLUE, TEXT } from 'Constants/colors';

// Styles
import styles from './styles.module.scss';

const emailFieldValidator = combineValidators(isRequired(), isEmail());

function SignIn(props) {
  const { handleSubmit, onCreateAccount, pending } = props;

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.icon}>
        <MdKey color={BLUE._500} size="64px" />
      </div>
      <h1 className={styles.title}>Логін</h1>
      <h3 className={styles.subtitle}>Вітання! Авторизуйтесь, будь-ласка.</h3>
      <Field
        component={FormInput}
        disabled={pending}
        labelText="Електронна пошта"
        name="email"
        placeholder="Введіть електронну пошту"
        type="email"
        validate={emailFieldValidator}
      />
      <Field
        component={FormInput}
        disabled={pending}
        labelText="Пароль"
        name="password"
        placeholder="Введіть пароль"
        type="password"
        validate={isRequired()}
      />
      <Button disabled={pending} type="submit">Авторизуватись</Button>
      <div className={styles.separator}>АБО</div>
      <GoogleAuthButton disabled={pending} />
      <Button disabled={pending} onClick={onCreateAccount} type="button" variant="secondary">
        <HiOutlineUserAdd color={TEXT.default} size="24px" />
        Створити обліковий запис
      </Button>
    </form>
  );
}

export default SignIn;
