// Modules
import { Navigate } from 'react-router-dom';

// Config
import { ROUTES } from 'Config/routes';

// Constants
import { PERMISSION } from 'Constants/permission';

// Context
import { useUserContext } from 'Context/UserContext';

// Styles
import styles from './styles.module.scss';

function Console() {
  const [user] = useUserContext();

  if (!user.hasPermissions(PERMISSION.ADMIN)) {
    return <Navigate to={ROUTES.dashboard} />;
  }

  return <h1>Admin Console</h1>;
}

export default Console;
