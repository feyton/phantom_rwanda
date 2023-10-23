/* eslint-disable no-unused-vars */
import { createAction, createReducer } from '@reduxjs/toolkit';

export const increment = createAction('increment/counter');
export const decrement = createAction('decrement/counter');
export const reset = createAction('reset/counter');

const intialState = { value: 0 };

export const counterReducer = createReducer(intialState, (builder) => {
  builder
    .addCase(increment, (state, action) => {
      state.value++;
    })
    .addCase(decrement, (state, action) => {
      state.value--;
    })
    .addCase(reset, (state, action) => {
      state.value = 0;
    });
});
