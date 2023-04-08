// Modules
import { ToastContainer } from 'react-toastify';
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';

// App
import App from 'App';

// Styles
import './index.scss';
import 'react-toastify/dist/ReactToastify.css';

const root = createRoot(document.getElementById('app'));

root.render(
  <StrictMode>
    <App />
    <ToastContainer style={{ width: '50%' }} position="bottom-center" />
  </StrictMode>
);
