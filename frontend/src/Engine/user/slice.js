// Modules
import { createSlice } from '@reduxjs/toolkit';

// Engine
import { loginAsync } from './async-actions';

const initialState = {
  accessToken: localStorage.getItem('access_token'),
  error: null,
  pending: false,
  user: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      Object.assign(state, initialState, { accessToken: null });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginAsync.pending, (state) => {
      state.pending = true;
    })
      .addCase(loginAsync.rejected, (state, { payload }) => {
        state.pending = false;
        state.error = payload;
      })
      .addCase(loginAsync.fulfilled, (state, { payload }) => {
        state.accessToken = payload.accessToken;
        state.pending = false;
      });
  }
});
