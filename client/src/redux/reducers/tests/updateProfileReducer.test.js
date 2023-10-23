import {
  updateProfileReducer,
  updateProfile
} from '../updateProfileReducer.js';

describe('updateProfile reducer Tests', () => {
  it('Should display a default Values', () => {
    expect(updateProfileReducer(undefined, {})).toEqual({
      firstName: 'Patrick',
      lastName: 'NGABO',
      mobileNumber: '0780000000',
      address: 'Kacyiru, Kigali',
      company: 'KBS',
      nationalID: '1199780020002120',
      driverLicense: '1199780020002120'
    });
  });

  it('should set new states on saveInfo', () => {
    expect(
      updateProfileReducer(
        {
          firstName: 'Patrick',
          lastName: 'NGABO',
          mobileNumber: '0780000000',
          address: 'Kacyiru, Kigali',
          company: 'KBS',
          nationalID: '1199780020002120',
          driverLicense: '1199780020002120'
        },
        updateProfile
      )
    ).toEqual({
      firstName: updateProfile.payload,
      lastName: updateProfile.payload,
      mobileNumber: updateProfile.payload,
      address: updateProfile.payload,
      company: updateProfile.payload,
      nationalID: updateProfile.payload,
      driverLicense: updateProfile.payload
    });
  });
});
