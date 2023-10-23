import { createAction, createReducer } from '@reduxjs/toolkit';
import { axiosBase } from '../../utils/Api.js';

export const loginUser = createAction('auth/login');
export const logoutUser = createAction('auth/logout');

const initialState = JSON.parse(localStorage.getItem('auth')) || {
  authenticated: false,
  user: null
};

export const authReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loginUser, (state, action) => {
      state.authenticated = true;
      state.user = action.payload;
      localStorage.setItem(
        'auth',
        JSON.stringify({
          authenticated: true,
          user: action.payload
        })
      );
      localStorage.setItem('token', action.payload.access_token);
    })
    .addCase(logoutUser, (state, action) => {
      state.authenticated = false;
      state.user = null;
      axiosBase.get('/accounts/logout');
      localStorage.removeItem('auth');
      localStorage.removeItem('token');
    });
});
