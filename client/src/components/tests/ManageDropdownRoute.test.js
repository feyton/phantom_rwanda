import { fireEvent, render, screen } from '@testing-library/react';
import { mount } from 'enzyme';
import { enableFetchMocks } from 'jest-fetch-mock';
import React from 'react';
import * as redux from 'react-redux';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { store } from '../../redux/store.js';
import ManageDropdownRoute from '../ManageDropdownRoute.js';

let spyOnUseSelector;
enableFetchMocks();

describe('ManageDropdownRoute component', () => {
  spyOnUseSelector = jest.spyOn(redux, 'useSelector');
  spyOnUseSelector.mockReturnValue({
    authenticated: true,
    user: {
      first_name: 'Fabrice',
      role: 'admin'
    }
  });

  const row = {
    routes: {
      destination1: 'Nyabugogo',
      destination2: 'DownTown',
      distance: '5km',
      id: 15,
      total_buses: '100'
    }
  };
  it('should render the ManageDropdownRoute component', () => {
    const elem = renderer
      .create(
        <Provider store={store}>
          <MemoryRouter>
            <ManageDropdownRoute row={row} />
          </MemoryRouter>
        </Provider>
      )
      .toJSON();
    expect(elem).toMatchSnapshot();
  });

  it('should render the CheckRole component', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <ManageDropdownRoute row={row} />
        </MemoryRouter>
      </Provider>
    );

    expect(wrapper.find('CheckRole').length).toEqual(2);
  });

  it('should Edit a Route', async () => {
    const handleEditMock = jest.fn();
    const elem = render(
      <Provider store={store}>
        <MemoryRouter>
          <ManageDropdownRoute row={row} handleEdit={handleEditMock} />
        </MemoryRouter>
      </Provider>
    );
    fireEvent.change(screen.getByTestId('select'), {
      target: { value: 'edit' }
    });
  });

  it('should View a Route', async () => {
    const handleViewMock = jest.fn();
    const elem = render(
      <Provider store={store}>
        <MemoryRouter>
          <ManageDropdownRoute row={row} handleView={handleViewMock} />
        </MemoryRouter>
      </Provider>
    );
    fireEvent.change(await screen.getByRole('select'), {
      target: { value: 'view' }
    });
  });

  it('should Delete selected Route', async () => {
    const handleDeleteMock = jest.fn();
    const elem = render(
      <Provider store={store}>
        <MemoryRouter>
          <ManageDropdownRoute row={row} handleDelete={handleDeleteMock} />
        </MemoryRouter>
      </Provider>
    );
    fireEvent.change(screen.getByTestId('select'), {
      target: { value: 'delete' }
    });

    expect(elem).toMatchSnapshot();
  });

  const mockedUsedNavigate = jest.fn();
  jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUsedNavigate
  }));
  const mockedUsedLocation = jest.fn();
  jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useLocation: () => mockedUsedLocation
  }));

  it('should not Fetch data from the database', async () => {
    const mockNavigator = jest.fn();
    jest.mock('react-router-dom', () => ({ useNavigate: () => mockNavigator }));

    global.fetch.mockResponseOnce(
      JSON.stringify({
        routes: {
          destination1: 'Kabuga',
          destination2: 'Nyabugogo',
          distance: '20km',
          total_buses: '100',
          id: 13
        }
      })
    );

    // expect(global.fetch.mock.calls.length).toEqual(1)
    expect(global.fetch).toHaveBeenCalledTimes(0);
  });
});
