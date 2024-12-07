import { configureStore } from '@reduxjs/toolkit';
import userslice from "./UserSlice"
import authSlice from './authSlice';
import socketSlice from './socketSlice';

const store = configureStore({
  reducer: {
    User : userslice,
    token : authSlice,
    socket : socketSlice,
    
  },
});

export default store;