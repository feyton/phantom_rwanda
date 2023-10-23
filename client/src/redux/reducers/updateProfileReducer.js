/* eslint-disable no-unused-vars */
import { createAction, createReducer } from '@reduxjs/toolkit';

export const updateProfile = createAction('update/profileUpdates');

const intialState = {
  firstName: 'Patrick',
  lastName: 'NGABO',
  mobileNumber: '0780000000',
  address: 'Kacyiru, Kigali',
  company: 'KBS',
  nationalID: '1199780020002120',
  driverLicense: '1199780020002120'
};

export const updateProfileReducer = createReducer(intialState, (builder) => {
  builder.addCase(updateProfile, (state, action) => {
    state.firstName = action.payload;
    state.lastName = action.payload;
    state.mobileNumber = action.payload;
    state.address = action.payload;
    state.company = action.payload;
    state.nationalID = action.payload;
    state.driverLicense = action.payload;
  });
});
