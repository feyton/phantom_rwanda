import { fireEvent, render, screen } from '@testing-library/react';
import { mount } from 'enzyme';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import AssignRouteModal, { assignRouteToBus } from '../AssignRoute.js';

const mockUseLocationValue = {
  pathname: '/testroute',
  search: '',
  hash: '',
  state: {
    plateNumber: 'RAB162H',
    busType: 'coaster',
    seats: 25,
    route: {
      origin: 'Nyabugogo',
      destination: 'Remera'
    }
  }
};
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn().mockImplementation(() => {
    return mockUseLocationValue;
  })
}));

describe('Modal tests', () => {
  const event = {
    target: {
      route: { value: 'some value' }
    }
  };
  it('It should test the onSubmit function', () => {
    const onSubmit = jest.fn();
    const component = mount(
      <MemoryRouter>
        <AssignRouteModal onSubmit={onSubmit()} />
      </MemoryRouter>
    );
    const form = component.find('form');
    form.simulate('submit', event);
    expect(onSubmit).toBeCalledTimes(1);
  });
  it('Should render the assign modal', async () => {
    const onSubmitMock = jest.fn();
    const handleCloseMock = jest.fn();

    const elem = render(
      <MemoryRouter>
        <AssignRouteModal
          onSubmit={onSubmitMock}
          handleClose={handleCloseMock}
        />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByTestId('bus-route'), {
      target: {
        value: 'RN45'
      }
    });

    fireEvent.submit(screen.getByTestId('assign-form'), {
      target: {
        route: { value: 'some value' }
      }
    });

    expect(elem).toMatchSnapshot();
  });
});
