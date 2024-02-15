// Modules
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Components
import FullScreenLoader from 'Components/FullScreenLoader';

// Config
import { ROUTES } from 'Config/routes';

// Helpers
import { checkGoogleLogin } from 'Helpers/checkGoogleLogin';
import Auth from 'Helpers/auth';

function Redirect() {
  const navigate = useNavigate();

  useEffect(() => {
    Promise.any([checkGoogleLogin()])
      .then((accessToken) => {
        Auth.logIn(accessToken);
        navigate(ROUTES.dashboard, { replace: true });
      })
      .catch(() => {
        navigate(ROUTES.auth, { replace: true });
      });
  });

  return <FullScreenLoader />;
}

export default Redirect;
