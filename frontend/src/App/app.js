// Modules
import { lazy } from 'react';
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
const Console = lazy(() => import('Screens/Dashboard/Screens/Console'));
const ConsoleDepartments = lazy(() => import('Screens/Dashboard/Screens/Console/Screens/ConsoleDepartments/console-departments'));
const ConsoleFaculties = lazy(() => import('Screens/Dashboard/Screens/Console/Screens/ConsoleFaculties/console-faculties'));
const ConsoleGroupDetails = lazy(() => import('Screens/Dashboard/Screens/Console/Screens/ConsoleGroupDetails'));
const ConsoleGroups = lazy(() => import('Screens/Dashboard/Screens/Console/Screens/ConsoleGroups/console-groups'));
const ConsoleInitial = lazy(() => import('Screens/Dashboard/Screens/Console/Screens/ConsoleInitial'));
const ConsoleUserDetails = lazy(() => import('Screens/Dashboard/Screens/Console/Screens/ConsoleUserDetails'));
const ConsoleUsers = lazy(() => import('Screens/Dashboard/Screens/Console/Screens/ConsoleUsers/console-users'));
const Dashboard = lazy(() => import('Screens/Dashboard'));
const GradeDetails = lazy(() => import('Screens/Dashboard/Screens/GradeDetails/grade-details'));
const Grades = lazy(() => import('Screens/Dashboard/Screens/Grades/grades'));
const JournalDetails = lazy(() => import('Screens/Dashboard/Screens/JournalDetails'));
const Journals = lazy(() => import('Screens/Dashboard/Screens/Journals'));
const Profile = lazy(() => import('Screens/Dashboard/Screens/Profile'));

function App() {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Auth />} path={ROUTES.auth}>
            <Route element={<SignIn />} index />
            <Route element={<SignUp />} path={ROUTES.signUp} />
            <Route element={<Congratulations />} path={ROUTES.congratulations} />
          </Route>

          <Route element={<Dashboard />} path={ROUTES.dashboard}>
            <Route index element={<Profile />} />
            <Route path={ROUTES.journals} element={<Journals />} />
            <Route path={ROUTES.grades} element={<Grades />} />
            <Route path={ROUTES.gradeDetails} element={<GradeDetails />} />
            <Route path={ROUTES.console} element={<Console />}>
              <Route index element={<ConsoleInitial />} />
              <Route path={ROUTES.consoleDepartments} element={<ConsoleDepartments />} />
              <Route path={ROUTES.consoleGroups} element={<ConsoleGroups />} />
              <Route path={ROUTES.consoleFaculties} element={<ConsoleFaculties />} />
              <Route path={ROUTES.consoleUsers} element={<ConsoleUsers />} />
              <Route path={ROUTES.consoleUsersDetails} element={<ConsoleUserDetails />} />
              <Route path={ROUTES.consoleGroupsDetails} element={<ConsoleGroupDetails />} />
            </Route>
          </Route>

          <Route path={ROUTES.journalDetails} element={<JournalDetails />} />

          <Route element={<Navigate replace to={ROUTES.auth} />} path="*" />
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
