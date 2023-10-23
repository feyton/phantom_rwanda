import { createAction, createReducer } from '@reduxjs/toolkit';

export const setPassengers = createAction('setpassengers/movement');
export const setIntervalId = createAction('setintervalid/movement');
export const setEntityId = createAction('setEntity/movement');
export const setInitialPassengers = createAction('setinitial/movement');
export const setbusSeats = createAction('setSeats/movement');
export const setinProgress = createAction('inprogress/movement');

const initialValue = {
  intervalId: null,
  passengers: 0,
  seats: null,
  initialPassengers: 0,
  entityId: null,
  inProgress: null
};

export const busMovementReducer = createReducer(initialValue, (builder) => [
  builder
    .addCase(setPassengers, (state, action) => {
      state.passengers = action.payload;
    })
    .addCase(setIntervalId, (state, action) => {
      state.intervalId = action.payload;
    })
    .addCase(setInitialPassengers, (state, action) => {
      state.initialPassengers = action.payload;
    })
    .addCase(setinProgress, (state, action) => {
      state.inProgress = action.payload;
    })
    .addCase(setEntityId, (state, action) => {
      state.entityId = action.payload;
    })
    .addCase(setbusSeats, (state, action) => {
      state.seats = action.payload;
    })
]);
