import {configureStore} from '@reduxjs/toolkit';
import authSlice from '../authSlice';
import apiSlice from '../apiSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    api: apiSlice ,
  },
});
