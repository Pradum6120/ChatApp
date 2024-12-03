import { configureStore } from '@reduxjs/toolkit';
import userslice from "./UserSlice"
import authSlice from './authSlice';

const store = configureStore({
  reducer: {
    User : userslice,
    token : authSlice
  },
});

export default store;