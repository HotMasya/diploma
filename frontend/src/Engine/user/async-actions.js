// API
import { createAsyncThunk } from '@reduxjs/toolkit';
import API from 'API';

export const loginAsync = createAsyncThunk(
  'AUTH/login',
  ({ email, password }, { rejectWithValue }) => API.Auth.login(email, password).catch(rejectWithValue)
);

const asyncActions = {
  loginAsync,
};

export default asyncActions;
