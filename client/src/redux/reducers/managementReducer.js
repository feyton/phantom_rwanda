import { createAction, createReducer } from '@reduxjs/toolkit';

export const setActiveTab = createAction('setActive/management');
export const resetTab = createAction('resetTab/management');
const initialState = {
  tabIndex: 0
};

export const managementReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setActiveTab, (state, action) => {
      state.tabIndex = action.payload;
    })
    .addCase(resetTab, (state, action) => {
      state.tabIndex = 0;
    });
});
