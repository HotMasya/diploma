// Modules
import cx from 'classnames';
import { Navigate, Outlet } from 'react-router-dom';

// Config
import { ROUTES } from 'Config/routes';

// Hooks
import { useAuthService } from 'Hooks/useAuthService';

// Styles
import styles from './styles.module.scss';

function AuthScreen() {
  const { user } = useAuthService();

  if (user) {
    return <Navigate to={ROUTES.dashboard} />;
  }

  return (
    <main className={styles.screen}>
      <div className={styles.half}>
        <Outlet />
      </div>

      <div className={cx(styles.half, styles.info)}>
        <div className={styles.card}>
          <h1>Lorem ipsum</h1>
        </div>
      </div>
    </main>
  );
}

export default AuthScreen;
