import mockAxios from 'axios';
import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { store } from '../../../redux/store.js';
import Routes from '../Routes.js';

describe('Route component', () => {
  describe('Should render the Routes components', () => {
    mockAxios.post.mockImplementationOnce(() => {
      return Promise.reject({
        status: 400,
        data: { data: { message: 'Email not found' } }
      });
    });
    const elem = renderer
      .create(
        <Provider store={store}>
          <MemoryRouter>
            <Routes />
          </MemoryRouter>
        </Provider>
      )
      .toJSON();

    expect(elem).toMatchSnapshot();
  });

  it('should render the RouteTable component', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <Routes />
        </MemoryRouter>
      </Provider>
    );

    expect(wrapper.find('RouteTable').length).toEqual(0);
  });
});
