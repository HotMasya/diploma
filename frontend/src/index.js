// Modules
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';

// App
import App from 'App';

// Styles
import './index.scss';

const root = createRoot(document.getElementById('app'));

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
