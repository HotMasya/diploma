// Modules
import cx from 'classnames';
import { Navigate, Outlet } from 'react-router-dom';
import { FaLock, FaClipboardList } from 'react-icons/fa';
import { GiStairsGoal } from 'react-icons/gi';

// Assets
import { EducationCap } from 'Assets/Icons/education-cap';

// Config
import { ROUTES } from 'Config/routes';

// Constants
import { BLUE, GREEN, TEXT, YELLOW } from 'Constants/colors';

// Helpers
import Auth from 'Helpers/auth';

// Styles
import styles from './styles.module.scss';

function AuthScreen() {
  if (Auth.token) {
    return <Navigate to={ROUTES.dashboard} />;
  }

  return (
    <main className={styles.screen}>
      <div className={styles.half}>
        <Outlet />
      </div>

      <div className={cx(styles.half, styles.info)}>
        <h1>Ласкаво просимо до Diploma!</h1>
        <p>
          <EducationCap fill={TEXT.subdued} />
          Ласкаво просимо до нашої системи контролю успішності студентів! З нами
          ви зможете легко і швидко отримати доступ до важливої інформації про
          ваших студентів.
        </p>
        <p>
          <FaLock color={YELLOW._500} size="24px" />
          Наша авторизаційна сторінка забезпечує максимальний рівень безпеки,
          щоб ваші дані залишалися конфіденційними та захищеними. Щоб увійти в
          систему, вам потрібно буде вказати свою електронну та пароль, або
          увійти через обліковий запис Google.
        </p>
        <p>
          <GiStairsGoal color={GREEN._500} size="24px" />
          Завдяки нашій системі ви зможете отримувати оновлену інформацію про
          академічну успішність ваших студентів, таку як оцінки за курси,
          залікові картки, заліково-екзаменаційні відомості, а також інформацію
          про відвідування занять.
        </p>
        <p>
          <FaClipboardList color={BLUE._500} size="24px" />
          Зареєструйтесь у нашій системі вже сьогодні, щоб отримати повний
          контроль над академічною успішністю ваших студентів та підтримувати їх
          на шляху до успіху!
        </p>
      </div>
    </main>
  );
}

export default AuthScreen;
