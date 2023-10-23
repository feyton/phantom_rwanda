/* eslint-disable no-unused-vars */
import { createAction, createReducer } from '@reduxjs/toolkit';

export const saveInfo = createAction('save/profileInfo');
export const editInfo = createAction('edit/profileInfo');

const dataStyles =
  'font-rale border-none rounded w-full py-2 px-3 text-grey-darker outline-hidden bg-white text-md';

const inputStyles =
  'border border-black font-rale rounded w-full py-2 px-3 text-grey-darker bg-gray-200 text-md';

const intialState = {
  disabled: true,
  styles: dataStyles,
  hideEdit: 'flex',
  hideSave: 'hidden',
  upload: '',
  editIcon: 'hidden',
  editPicture: ''
};

export const profileReducer = createReducer(intialState, (builder) => {
  builder
    .addCase(saveInfo, (state, action) => {
      state.disabled = true;
      state.styles = dataStyles;
      state.hideEdit = 'flex';
      state.hideSave = 'hidden';
      state.editIcon = 'hidden';
      state.editPicture = '';
    })
    .addCase(editInfo, (state, action) => {
      state.disabled = false;
      state.styles = inputStyles;
      state.hideEdit = 'hidden';
      state.hideSave = 'flex';
      state.upload = 'photo-upload';
      state.editIcon = 'absolute';
      state.editPicture = 'hover:cursor-pointer';
    });
});
