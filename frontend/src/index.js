// Modules
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';

// App
import App from 'App';

// Engine
import { store } from './Engine';

// Styles
import './index.scss';

const root = createRoot(document.getElementById('app'));

root.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
