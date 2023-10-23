import { createAction, createReducer } from '@reduxjs/toolkit';

export const setDashboarddata = createAction('setdashboardData/management');
export const setNotifications = createAction('setNotifications/management');

const initialState = {
  info: {},
  notifications: []
};

export const dashboardReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setDashboarddata, (state, action) => {
      state.info = action.payload;
    })
    .addCase(setNotifications, (state, action) => {
      state.notifications = action.payload;
    });
});
