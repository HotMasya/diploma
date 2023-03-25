// Modules
import { configureStore } from '@reduxjs/toolkit';

// Engine
import user from './user';

export const store = configureStore({
  reducer: {
    user,
  },
});
