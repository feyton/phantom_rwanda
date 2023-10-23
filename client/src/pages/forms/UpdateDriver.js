import React from 'react';
import UpdateProfile from './UpdateProfile.js';

const UpdateDriver = () => {
  return (
    <div>
      <UpdateProfile
        addressInfo="Kacyiru, Kigali"
        companyInfo="REL"
        firstNameInfo="Eric"
        lastNameInfo="SHEMA"
        mobileNumberInfo="0789989655"
        nationalIDInfo="1199780020002120"
        driverLicenseInfo="1199780020002120"
        position="Driver"
      />
    </div>
  );
};

export default UpdateDriver;
