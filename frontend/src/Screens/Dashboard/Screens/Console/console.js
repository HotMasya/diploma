// Modules
import { useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// Components
import Paper from 'Components/Paper';

// Config
import { ROUTES } from 'Config/routes';

// Constants
import { PERMISSION } from 'Constants/permission';

// Context
import { useUserContext } from 'Context/UserContext';

function Console() {
  const [user] = useUserContext();
  const outletContext = useState({});

  if (!user.hasPermissions(PERMISSION.ADMIN)) {
    return <Navigate to={ROUTES.dashboard} />;
  }

  return (
    <Paper>
      <h1>Консоль Адміністратора</h1>
      <Outlet context={outletContext} />
    </Paper>
  );
}

export default Console;
