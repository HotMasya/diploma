// Modules
import { Outlet } from 'react-router-dom';
import { Suspense, useState } from 'react';

// Components
import Header from 'Components/Header';
import FullScreenLoader from 'Components/FullScreenLoader';

// Hooks
import { useLoadCurrentUser } from 'Hooks/useLoadCurrentUser';

// Models
import User from 'Models/User';

// Styles
import styles from './styles.module.scss';

function Dashboard() {
  const [outletContext, setOutletContext] = useState();
  const [user, pending] = useLoadCurrentUser();

  if (pending) {
    return <FullScreenLoader />;
  }

  const isUserValid = user instanceof User;

  return (
    <>
      <Header />
      <main className={styles.body}>
        <Suspense fallback={null}>
          {isUserValid ? (
            <Outlet context={[outletContext, setOutletContext]} />
          ) : null}
        </Suspense>
      </main>
    </>
  );
}

export default Dashboard;
