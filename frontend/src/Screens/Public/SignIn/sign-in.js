// Modules
import { Field } from 'react-final-form';
import { MdKey } from 'react-icons/md';
import { FcGoogle } from 'react-icons/fc';
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

const emailFieldValidator = combineValidators(isRequired(), isEmail());

function SignIn(props) {
  const { handleSubmit, onCreateAccount, onGoogleAuth } = props;

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.icon}>
        <MdKey color={BLUE._500} size="64px" />
      </div>
      <h1 className={styles.title}>Логін</h1>
      <h3 className={styles.subtitle}>Вітання! Авторизуйтесь, будь-ласка.</h3>
      <Field
        component={FormInput}
        labelText="Електронна пошта"
        name="email"
        placeholder="Введіть електронну пошту"
        type="email"
        validate={emailFieldValidator}
      />
      <Field
        component={FormInput}
        labelText="Пароль"
        name="password"
        placeholder="Введіть пароль"
        type="password"
        validate={isRequired()}
      />
      <Button type="submit">Авторизуватись</Button>
      <div className={styles.separator}>АБО</div>
      <Button onClick={onGoogleAuth} type="button" variant="secondary">
        <FcGoogle size="24px" /> Авторизуватись через Google
      </Button>
      <Button onClick={onCreateAccount} type="button" variant="secondary">
        <HiOutlineUserAdd color={TEXT.default} size="24px" />
        Створити обліковий запис
      </Button>
    </form>
  );
}

export default SignIn;
