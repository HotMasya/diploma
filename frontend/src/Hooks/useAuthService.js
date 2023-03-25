// Modules
import { useDispatch, useSelector } from 'react-redux'
import { useCallback, useEffect } from 'react';

// Engine
import userSelector from 'Engine/user/selectors/user';
import pendingSelector from 'Engine/user/selectors/pending';
import errorSelector from 'Engine/user/selectors/error';
import userAsyncActions from 'Engine/user/async-actions';
import userActions from 'Engine/user/actions';

export function useAuthService() {
  const dispatch = useDispatch();

  const user = useSelector(userSelector);
  const pending = useSelector(pendingSelector);
  const error = useSelector(errorSelector);

  const login = useCallback((email, password) => {
    dispatch(userAsyncActions.loginAsync({ email, password }));
  }, []);

  const logout = useCallback(() => {
    dispatch(userActions.logout());
  }, []);

  useEffect(() => {
    if (error) {
      // show error...
    }
  }, []);

  return {
    error,
    login,
    logout,
    pending,
    user,
  };
}
