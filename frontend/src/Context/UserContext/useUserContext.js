// Modules
import { useContext } from 'react';

// Context
import { UserContext } from './user-context';

/**
 * Returns current logged in user if there is one
 *
 * @returns {{ user: import('Models/User').default, pending: boolean }} Logged in user
 */
export function useUserContext() {
  return useContext(UserContext);
}
