import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import AssignModal from '../AssignBus.js';
import ChangeRole from '../ChangeRole.js';

jest.mock('axios');
const mockUseLocationValue = {
  pathname: '/testroute',
  search: '',
  hash: '',
  state: {
    name: 'Fabrice',
    email: 'emanuel@me.com',
    id: 1,
    license: '199787200045637884773',
    plate: 'RAB1000'
  }
};
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn().mockImplementation(() => {
    return mockUseLocationValue;
  })
}));

describe('Modal tests', () => {
  it('Should render the assign modal', async () => {
    const handleSubmitMock = jest.fn();
    const handleCloseMock = jest.fn();
    const data = {
      data: [
        {
          busType: 'Minibus',
          company: 'KBS',
          seats: '20',
          plateNumber: 'RAB1234',
          driver: 'Muhire Girbert',
          route: null,
          id: 1
        }
      ]
    };
    axios.get.mockImplementation(() => Promise.resolve(data));
    const elem = render(
      <MemoryRouter>
        <AssignModal
          handleSubmit={handleSubmitMock}
          handleClose={handleCloseMock}
        />
      </MemoryRouter>
    );
    // expect(await screen.findAllByText(/fabrice@me.com/i)).toHaveLength();

    userEvent.type(screen.getByTestId('bus-plate'), 'rab1234');
    await new Promise((r) => setTimeout(r, 500));
    fireEvent.submit(screen.getByTestId('assign-form'));
    await new Promise((r) => setTimeout(r, 2000));
    expect(elem).toMatchSnapshot();
  });
});

describe('Change Roles', () => {
  it('Renders the modal and submit form', async () => {
    const handleSubmitMock = jest.fn();
    const handleCloseMock = jest.fn();
    const SearchPlateMock = jest.fn(() => new Promise.resolve());
    const elem = render(
      <MemoryRouter>
        <ChangeRole
          name="Fabrice"
          email="fabrice@me.com"
          handleSubmit={handleSubmitMock()}
          SearchPlate={SearchPlateMock}
          handleClose={handleCloseMock}
        />
      </MemoryRouter>
    );
    // expect(await screen.findAllByText(/fabrice@me.com/i)).toHaveLength();
    fireEvent.change(screen.getByTestId('permissions'), {
      target: {
        value: '3'
      }
    });
    expect(elem).toMatchSnapshot();
  });
});
// describe('Function', () => {
//   const axiosMock = jest.spyOn(axios, 'patch');
//   axiosMock.mockImplementation(() => Promise.resolve({}));
//   it('Should pass', async () => {
//     const busInfo = {
//       id: 10
//     };
//     const driverInfo = {
//       id: 10,
//       name: 'Fabrice'
//     };
//     const response = await assignBusToDriver(busInfo, driverInfo);
//     expect(false).toEqual(false);
//   });
// });
