import { createAction, createReducer } from '@reduxjs/toolkit';

export const setConnected = createAction('connected/socket');
export const setDisconnected = createAction('disconnected/socket');
export const setSocketError = createAction('socketError/counter');
export const setActive = createAction('active/counter');

const intialState = {
  active: 0,
  connected: false,
  error: null
};

export const socketReducer = createReducer(intialState, (builder) => {
  builder
    .addCase(setConnected, (state, action) => {
      state.connected = true;
      state.error = null;
    })
    .addCase(setDisconnected, (state, action) => {
      state.connected = false;
      state.error = 'Disconnected';
    })
    .addCase(setSocketError, (state, action) => {
      state.connected = false;
      state.error = action.payload.message;
    })
    .addCase(setActive, (state, action) => {
      state.active = action.payload.active;
    });
});
