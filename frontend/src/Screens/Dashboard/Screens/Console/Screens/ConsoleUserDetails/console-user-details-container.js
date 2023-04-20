// Modules
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';

// API
import API from 'API';

// Components
import ConsoleUserDetails from './console-user-details';

function ConsoleUserDetailsContainer() {
  const { userId } = useParams();
  const [user, setUser] = useState();

  useEffect(() => {
    API.Users.findOne(userId)
      .then(setUser)
      .catch((err) => {
        toast(API.parseError(err), {
          type: 'error',
        });
      });
  }, [userId]);

  if (!user) return null;

  return <ConsoleUserDetails user={user} />;
}

export default ConsoleUserDetailsContainer;
