import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { store } from '../../redux/store.js';
import CheckRoles from '../CheckRoles.js';

describe('CheckRoles component', () => {
  it('should render the ManageDropdownRoute component', () => {
    const elem = renderer
      .create(
        <Provider store={store}>
          <MemoryRouter>
            <CheckRoles />
          </MemoryRouter>
        </Provider>
      )
      .toJSON();
    expect(elem).toMatchSnapshot();
  });
});
