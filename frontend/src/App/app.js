// Modules
import { ROUTES } from 'Config/routes';
import { lazy } from 'react';
import { Navigate, Route, BrowserRouter, Routes } from 'react-router-dom';

// Screens
const Auth = lazy(() => import('Screens/Public/Auth'));
const SignIn = lazy(() => import('Screens/Public/SignIn'));
const SignUp = lazy(() => import('Screens/Public/SignUp'));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Auth />} path={ROUTES.auth}>
          <Route element={<SignIn />} index />
          <Route element={<SignUp />} path={ROUTES.signUp} />
        </Route>

        <Route element={<Navigate replace to={ROUTES.auth} />} path="*" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
