// Modules
import { createContext, useState } from 'react';

export const UserContext = createContext(null);

UserContext.displayName = 'User Context';

function UserContextProvider(props) {
  const { children } = props;
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
