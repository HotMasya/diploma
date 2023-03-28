// Modules
import { Suspense, lazy } from 'react';
import { Navigate, Route, BrowserRouter, Routes } from 'react-router-dom';

// Config
import { ROUTES } from 'Config/routes';

// Context
import UserContextProvider from 'Context/UserContext/user-context';

// Screens
import SignIn from 'Screens/Public/SignIn';
import SignUp from 'Screens/Public/SignUp';

const Auth = lazy(() => import('Screens/Public/Auth'));
const Dashboard = lazy(() => import('Screens/Dashboard'));
const Profile = lazy(() => import('Screens/Dashboard/Screens/Profile'));
const Console = lazy(() => import('Screens/Dashboard/Screens/Console'));

function App() {
  return (
    <UserContextProvider>
      <Suspense fallback={null}>
        <BrowserRouter>
          <Routes>
            <Route element={<Auth />} path={ROUTES.auth}>
              <Route element={<SignIn />} index />
              <Route element={<SignUp />} path={ROUTES.signUp} />
            </Route>

            <Route element={<Dashboard />} path={ROUTES.dashboard}>
              <Route index element={<Profile />} />
              <Route path={ROUTES.console} element={<Console />} />
            </Route>

            <Route element={<Navigate replace to={ROUTES.auth} />} path="*" />
          </Routes>
        </BrowserRouter>
      </Suspense>
    </UserContextProvider>
  );
}

export default App;
