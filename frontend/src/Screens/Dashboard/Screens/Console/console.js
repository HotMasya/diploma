// Modules
import { useState } from 'react';
import { Outlet } from 'react-router-dom';

// Components
import Paper from 'Components/Paper';

function Console() {
  const outletContext = useState({});

  return (
    <Paper>
      <h1>Консоль Адміністратора</h1>
      <Outlet context={outletContext} />
    </Paper>
  );
}

export default Console;
