// Modules
import { BG, GREEN } from 'Constants/colors';
import { BsCheckLg } from 'react-icons/bs';
import { Navigate, useLocation } from 'react-router-dom';
import get from 'lodash/get';

// API
import API from 'API';

// Config
import { ROUTES } from 'Config/routes';

// Styles
import styles from './styles.module.scss';

function Congratulations() {
  const { state } = useLocation();
  const verification = get(state, 'verification', false);

  const handleResend = (e) => {
    e.preventDefault();
    console.log('resend is not implemented');
  };

  if (!verification) {
    return <Navigate replace to={ROUTES.auth} />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.icon}>
        <BsCheckLg color={GREEN._500} size="64px" />
      </div>
      <h1>Вітання!</h1>
      <h4>
        Вас успішно зареєстровано. Для завершення підтвердіть свою пошту,
        будь-ласка. Для цього ми вам надіслали повідомлення на пошту.
      </h4>
      <h4 className={styles.hint}>
        Якщо вам не прийшло повідомлення, ви можете&nbsp;
        <button className={styles.link} onClick={handleResend}>
          надіслати його знову
        </button>
        .
      </h4>
    </div>
  );
}

export default Congratulations;
