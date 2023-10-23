import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../../redux/store.js';
import UpdateDriver from '../UpdateDriver.js';

describe('UpdateDriver', () => {
  it('should render the UpdateDriver component', () => {
    const elem = renderer
      .create(
        <Provider store={store}>
          <MemoryRouter>
            <UpdateDriver />
          </MemoryRouter>
        </Provider>
      )
      .toJSON();
    expect(elem).toMatchSnapshot();
  });
});
