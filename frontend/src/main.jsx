import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import Authentication, { PageType } from './pages/Authentication.jsx';
import ChallengesList from './pages/ChallengesList.jsx';
import CreateChallenge from './components/CreateChallenge.jsx';

import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/login',
    element: <Authentication pageType={PageType.LOGIN} />,
  },
  {
    path: '/register',
    element: <Authentication pageType={PageType.REGISTER} />,
  },
  {
    path: '/challenges',
    element: <ChallengesList />, // Route to view the list of challenges
  },
  {
    path: '/create-challenge',
    element: <CreateChallenge />, // Route to create a new challenge
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
