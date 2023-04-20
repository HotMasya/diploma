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
import Congratulations from 'Screens/Public/Congratulations';

const Auth = lazy(() => import('Screens/Public/Auth'));
const Dashboard = lazy(() => import('Screens/Dashboard'));
const Profile = lazy(() => import('Screens/Dashboard/Screens/Profile'));
const Console = lazy(() => import('Screens/Dashboard/Screens/Console'));
const ConsoleInitial = lazy(() => import('Screens/Dashboard/Screens/Console/Screens/ConsoleInitial'));
const ConsoleDepartments = lazy(() => import('Screens/Dashboard/Screens/Console/Screens/ConsoleDepartments/console-departments'));
const ConsoleGroups = lazy(() => import('Screens/Dashboard/Screens/Console/Screens/ConsoleGroups/console-groups'));
const ConsoleFaculties = lazy(() => import('Screens/Dashboard/Screens/Console/Screens/ConsoleFaculties/console-faculties'));
const ConsoleUsers = lazy(() => import('Screens/Dashboard/Screens/Console/Screens/ConsoleUsers/console-users'));
const ConsoleUserDetails = lazy(() => import ('Screens/Dashboard/Screens/Console/Screens/ConsoleUserDetails'));

function App() {
  return (
    <UserContextProvider>
      <Suspense fallback={null}>
        <BrowserRouter>
          <Routes>
            <Route element={<Auth />} path={ROUTES.auth}>
              <Route element={<SignIn />} index />
              <Route element={<SignUp />} path={ROUTES.signUp} />
              <Route element={<Congratulations />} path={ROUTES.congratulations} />
            </Route>

            <Route element={<Dashboard />} path={ROUTES.dashboard}>
              <Route index element={<Profile />} />
              <Route path={ROUTES.console} element={<Console />}>
                <Route index element={<ConsoleInitial />} />
                <Route path={ROUTES.consoleDepartments} element={<ConsoleDepartments />} />
                <Route path={ROUTES.consoleGroups} element={<ConsoleGroups />} />
                <Route path={ROUTES.consoleFaculties} element={<ConsoleFaculties />} />
                <Route path={ROUTES.consoleUsers} element={<ConsoleUsers />} />
                <Route path={ROUTES.consoleUsersDetails} element={<ConsoleUserDetails />} />
              </Route>
            </Route>

            <Route element={<Navigate replace to={ROUTES.auth} />} path="*" />
          </Routes>
        </BrowserRouter>
      </Suspense>
    </UserContextProvider>
  );
}

export default App;
