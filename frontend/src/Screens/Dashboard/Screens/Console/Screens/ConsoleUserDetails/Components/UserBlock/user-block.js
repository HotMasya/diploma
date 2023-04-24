// Modules
import { Field } from 'react-final-form';

// Components
import FormInput from 'Components/FormInput';
import Checkbox from 'Components/Checkbox';

// Helpers
import { isRequired } from 'Helpers/isRequired';
import { combineValidators } from 'Helpers/combineValidators';
import { isEmail } from 'Helpers/isEmail';

// Styles
import styles from '../../styles.module.scss';

function UserBlock() {
  return (
    <>
      <h2 className={styles.title}>Загальна інформація</h2>
      <div className={styles.pair}>
        <Field
          component={FormInput}
          labelText="Ім'я"
          placeholder="Вкажіть ім'я"
          name="firstName"
          validate={isRequired()}
        />

        <Field
          component={FormInput}
          labelText="Прізвище"
          placeholder="Вкажіть прізвище"
          name="lastName"
          validate={isRequired()}
        />
      </div>

      <div className={styles.pair}>
        <Field
          component={FormInput}
          labelText="Електронна пошта"
          placeholder="Вкажіть електронну пошту"
          name="email"
          type="email"
          validate={combineValidators(isRequired(), isEmail())}
        />
      </div>

      <Field name="verified" type="checkbox">
        {({ input }) => <Checkbox labelText="Пошта підтверджена" {...input} />}
      </Field>

      <h2 className={styles.passwords}>Змінити пароль</h2>
      <div className={styles.pair}>
      <Field
          component={FormInput}
          labelText="Пароль"
          placeholder="Вкажіть новий пароль"
          name="password"
          type="password"
        />

        <Field
          component={FormInput}
          labelText="Повторити пароль"
          placeholder="Вкажіть новий пароль знову"
          name="repeatPassword"
          type="password"
        />
      </div>
    </>
  );
}

export default UserBlock;
