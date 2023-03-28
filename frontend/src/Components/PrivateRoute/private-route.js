// Modules
import { Navigate, Route } from 'react-router-dom';

// Constants
import { ROUTES } from 'Config/routes';

// Hooks
import { useAuthService } from 'Hooks/useAuthService';

/**
 * @param {import('Models/User').default} user
 * @param {number} permissions
 */
function hasPermissions(user, permissions) {
  if (permissions && !user) return false;

  if (!user.hasPermissions(permissions)) return false;

  return true;
}

function PrivateRoute(props) {
  const { permissions, ...rest } = props;

  const { user } = useAuthService();

  if (hasPermissions(user, permissions)) {
    return <Navigate replace to={ROUTES.signIn} />;
  }

  return (
    <Route {...rest} />
  );
}

export default PrivateRoute;
