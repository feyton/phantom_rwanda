import React from 'react';
import { render } from '@testing-library/react';
import OperatorsTable from '@components/OperatorsTable.js';
import ProviderWrapper from '@utils/TestUtil.js';

const data = [
  {
    address: 'Kabuga, Kigali',
    company: 'Kigali Bus Services',
    id: 2,
    license: '1200080081693164',
    mobileNumber: '0788352746',
    nationalID: '1200080081391164',
    user: {
      email: 'feyton@hotmail.com',
      firstName: 'testName',
      id: 13,
      lastName: 'testname2',
      role: 'driver'
    }
  },
  {
    address: 'Kabuga, Kigali',
    company: 'Kigali Bus Services',
    id: 2,
    license: '1200080081693164',
    mobileNumber: '0785552746',
    nationalID: '1200080085591164',
    user: {
      email: 'driver@hotmail.com',
      firstName: 'feyton',
      id: 13,
      lastName: 'testname2',
      role: 'driver'
    }
  }
];

describe('Operator Table', () => {
  it('Renders the table', () => {
    const elem = render(
      <ProviderWrapper>
        <OperatorsTable data={data} />
      </ProviderWrapper>
    );
    expect(elem).toMatchSnapshot();
  });
});
