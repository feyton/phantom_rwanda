import mockAxios from 'axios';
import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import RouteTable from '../RouteTable.js';
import { store } from '../../../../redux/store.js';

describe('Route table Page', () => {
  const data = [
    {
      destination1: 'Kabuga',
      destination2: 'Nyanza',
      distance: '22km',
      total_buses: '100',
      id: 35
    },
    {
      destination1: 'Kabuga',
      destination2: 'Nyabugogo',
      distance: '20km',
      total_buses: '100',
      id: 36
    }
  ];
  it('should render the Route table component', () => {
    mockAxios.post.mockImplementationOnce(() => {
      return Promise.resolve({
        status: 200,
        data: { data: routes }
      });
    });
    const elem = renderer
      .create(
        <Provider store={store}>
          <MemoryRouter>
            <RouteTable />
          </MemoryRouter>
        </Provider>
      )
      .toJSON();
    expect(elem).toMatchSnapshot();
  });

  it('should render the button component', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <RouteTable data={data} />
        </MemoryRouter>
      </Provider>
    );
  });
});
