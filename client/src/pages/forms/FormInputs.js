export const driverInputs = [
  [
    {
      id: 'firstname',
      pattern: /^[a-zA-Z][a-zA-Z ]{3,32}$/i,
      labelName: 'First name',
      type: 'text',
      name: 'firstName',
      message: 'A valid firstname is required',
      placeholder: 'Vedaste'
    },
    {
      id: 'lastname',
      pattern: /^[a-zA-Z][a-zA-Z ]{3,32}$/i,
      labelName: 'Last name',
      type: 'text',
      name: 'lastName',
      message: 'A valid last name is required',
      placeholder: 'Hategekimana'
    }
  ],
  [
    {
      id: 'email',
      pattern:
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      labelName: 'Email',
      type: 'email',
      name: 'email',
      message: 'Invalid email address',
      placeholder: 'example@mail.com'
    },
    {
      id: 'mobileNumber',
      pattern: /(0|7|8)\d{9}$/,
      labelName: 'Mobile number',
      type: 'text',
      name: 'mobileNumber',
      message: 'Invalid mobile number',
      placeholder: '0789000000'
    }
  ],
  [
    {
      type: 'select',
      name: 'company',
      id: 'company',
      placeholder: 'Select company',
      labelName: 'Select company',
      options: [
        { name: 'Select company', id: 'def' },
        {
          value: 'Royal Express Limited',
          name: 'Royal Express Limited',
          id: 'royal'
        },
        { value: 'City Express Ltd', name: 'City Express Ltd', id: 'kbs' },
        { value: 'Kigali bus services', name: 'Kigali bus services', id: 'kbs' }
      ]
    },
    {
      type: 'text',
      name: 'address',
      id: 'address',
      labelName: 'Address',
      pattern: /^(?!.* {2})[a-z][a-z ]{3,}/i,
      message: 'Invalid address',
      placeholder: 'Cell, Sector, District'
    }
  ],
  [
    {
      id: 'nationalid',
      pattern: /^[1-3](19|20)\d{2}[7-8]\d{7}[0-9]\d{2}$/,
      labelName: 'National ID',
      name: 'nationalID',
      message: 'A valid national ID is required',
      placeholder: '1 119950030880 0 40'
    },
    {
      id: 'license',
      pattern: /^[1-3](19|20)\d{2}[7-8]\d{7}[0-9]\d{2}$/,
      labelName: 'Driver License',
      name: 'license',
      message: 'A valid driver license is required',
      placeholder: '1 119950030880 0 40'
    }
  ]
];

export const operatorInputs = driverInputs.slice().fill(
  [
    {
      id: 'nationalid',
      pattern: /^[1-3](19|20)\d{2}[7-8]\d{7}[0-9]\d{2}$/,
      labelName: 'National ID',
      name: 'nationalID',
      message: 'A valid national ID is required',
      placeholder: '1 119950030880 0 40'
    }
  ],
  -1
);
