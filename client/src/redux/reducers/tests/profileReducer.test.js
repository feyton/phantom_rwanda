import { profileReducer, saveInfo, editInfo } from '../profileReducer.js';

const dataStyles =
  'font-rale border-none rounded w-full py-2 px-3 text-grey-darker outline-hidden bg-white text-md';

const inputStyles =
  'border border-black font-rale rounded w-full py-2 px-3 text-grey-darker bg-gray-200 text-md';

describe('Profile reducer Tests', () => {
  it('Should display a default Values', () => {
    expect(profileReducer(undefined, {})).toEqual({
      disabled: true,
      styles: dataStyles,
      hideEdit: 'flex',
      hideSave: 'hidden',
      upload: '',
      editIcon: 'hidden',
      editPicture: ''
    });
  });

  it('should set new states on saveInfo', () => {
    expect(
      profileReducer(
        {
          disabled: true,
          styles: dataStyles,
          hideEdit: 'flex',
          hideSave: 'hidden',
          editIcon: 'hidden',
          editPicture: ''
        },
        saveInfo
      )
    ).toEqual({
      disabled: true,
      styles: dataStyles,
      hideEdit: 'flex',
      hideSave: 'hidden',
      editIcon: 'hidden',
      editPicture: ''
    });
  });

  it('should set new states on editInfo', () => {
    expect(
      profileReducer(
        {
          disabled: true,
          styles: dataStyles,
          hideEdit: 'flex',
          hideSave: 'hidden',
          editIcon: 'hidden',
          editPicture: ''
        },
        editInfo
      )
    ).toEqual({
      disabled: false,
      styles: inputStyles,
      hideEdit: 'hidden',
      hideSave: 'flex',
      upload: 'photo-upload',
      editIcon: 'absolute',
      editPicture: 'hover:cursor-pointer'
    });
  });
});
