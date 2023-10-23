import { createAction, createReducer } from '@reduxjs/toolkit';

export const changeTrack = createAction('change/simulate');
export const joinRoom = createAction('joinRoom/simulate');
export const updateLocation = createAction('update/simulate');
export const setUserLocation = createAction('userLocation/simulate');
export const setRoute = createAction('markers/simulate');
export const setActiveBuses = createAction('buses/simulate');

const initialState = {
  room: null,
  location: null,
  userLocation: null,
  route: null,
  buses: []
};

export const simulateReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(updateLocation, (state, action) => {
      state.location = action.payload;
    })
    .addCase(joinRoom, (state, action) => {
      state.room = action.payload.room;
    })
    .addCase(setUserLocation, (state, action) => {
      state.userLocation = action.payload;
    })
    .addCase(setRoute, (state, action) => {
      state.route = action.payload;
    })
    .addCase(setActiveBuses, (state, action) => {
      state.buses = action.payload;
    });
});
