// Modules
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// API
import API from 'API';

// Context
import { useUserContext } from 'Context/UserContext';

// Config
import { ROUTES } from 'Config/routes';

// Models
import User from 'Models/User';

// Helpers
import Auth from 'Helpers/auth';

export function useLoadCurrentUser() {
  const navigate = useNavigate();
  const [user, setUser] = useUserContext();
  const [pending, setPending] = useState(false);

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

    toast.promise(
      request,
      {
        success: {
          render: ({ data }) => (
            <>
              Вітаємо в DIPLOMA, <b>{data.fullName}</b>!
            </>
          ),
        },
      },
      {
        autoClose: 3000,
        toastId: 'get-user-toast',
      }
    );
  }, [navigate, pending, setUser, user]);

  return useMemo(() => [user, pending], [pending, user]);
}
