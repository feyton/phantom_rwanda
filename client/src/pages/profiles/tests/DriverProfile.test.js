import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../../redux/store.js';
import DriverProfile from '../DriverProfile.js';

describe('DriverProfile', () => {
  it('should render the DriverProfile component', () => {
    const elem = renderer
      .create(
        <Provider store={store}>
          <MemoryRouter>
            <DriverProfile />
          </MemoryRouter>
        </Provider>
      )
      .toJSON();
    expect(elem).toMatchSnapshot();
  });
});
