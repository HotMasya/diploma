// Modules
import { Field } from 'react-final-form';
import { MdKey } from 'react-icons/md';
import { HiOutlineUserAdd } from 'react-icons/hi';

// Components
import FormInput from 'Components/FormInput';
import Button from 'Components/Button';

// Helpers
import { combineValidators } from 'Helpers/combineValidators';
import { isRequired } from 'Helpers/isRequired';
import { isEmail } from 'Helpers/isEmail';

// Constants
import { BLUE, TEXT } from 'Constants/colors';

// Styles
import styles from './styles.module.scss';
import GoogleAuthButton from 'Components/GoogleAuthButton/google-auth-button';

const emailFieldValidator = combineValidators(isRequired(), isEmail());

function SignUp(props) {
  const { handleSubmit, onLogin, pending } = props;

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.icon}>
        <HiOutlineUserAdd color={BLUE._500} size="64px" />
      </div>
      <h1 className={styles.title}>Новий обліковий запис</h1>
      <h3 className={styles.subtitle}>Вітання! Вкажіть свої дані, будь-ласка.</h3>
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
      <Field
        component={FormInput}
        disabled={pending}
        labelText="Повторіть пароль"
        name="repeatPassword"
        placeholder="Введіть пароль знову"
        type="password"
        validate={isRequired()}
      />
      <Field
        component={FormInput}
        disabled={pending}
        labelText="Ім'я"
        name="firstName"
        placeholder="Введіть ваше ім'я"
        type="text"
        validate={isRequired()}
      />
      <Field
        component={FormInput}
        disabled={pending}
        labelText="Прізвище"
        name="lastName"
        placeholder="Введіть ваше прізвище"
        type="text"
        validate={isRequired()}
      />
      <Button disabled={pending} type="submit">Готово</Button>
      <div className={styles.separator}>АБО</div>
      <GoogleAuthButton disabled={pending} />
      <Button disabled={pending} onClick={onLogin} type="button" variant="secondary">
        <MdKey color={TEXT.default} size="24px" />
        Авторизуватись
      </Button>
    </form>
  );
}

export default SignUp;
