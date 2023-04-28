// Modules
import { Outlet, useNavigate } from 'react-router-dom';
import { Suspense, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

// API
import API from 'API';

// Components
import Header from 'Components/Header';
import FullScreenLoader from 'Components/FullScreenLoader';

// Config
import { ROUTES } from 'Config/routes';

// Context
import { useUserContext } from 'Context/UserContext';

// Helpers
import Auth from 'Helpers/auth';

// Models
import User from 'Models/User';

// Styles
import styles from './styles.module.scss';

function Dashboard() {
  const [user, setUser] = useUserContext();
  const [pending, setPending] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!Auth.token) {
      navigate(ROUTES.auth);
      return;
    }

    if (pending || user instanceof User) return;

    setPending(true);

    const request = API.Users.me()
      .then((user) => {
        setUser(user);
        return user;
      })
      .catch(() => {
        Auth.logOut();
        navigate(ROUTES.auth);
      })
      .finally(() => setPending(false));

    toast.promise(request, {
      success: {
        render: ({ data }) => (<>Вітаємо в DIPLOMA, <b>{data.fullName}</b>!</>),
      }
    }, {
      autoClose: 3000,
      toastId: 'get-user-toast',
    });
  }, [navigate, pending, setUser, user]);

  if (pending) {
    return <FullScreenLoader />;
  }

  const isUserValid = user instanceof User;

  return (
    <>
      <Header />
      <main className={styles.body}>
        <Suspense fallback={null}>
          {isUserValid ? <Outlet /> : null}
        </Suspense>
      </main>
    </>
  );
}

export default Dashboard;
