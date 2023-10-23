import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { store } from '../../redux/store.js';
import SideNav from '../SideNav.js';

describe('SideNav', () => {
  it('should render the SideNav component', () => {
    const elem = renderer
      .create(
        <Provider store={store}>
          <MemoryRouter>
            <SideNav />
          </MemoryRouter>
        </Provider>
      )
      .toJSON();
    expect(elem).toMatchSnapshot();
  });
});
