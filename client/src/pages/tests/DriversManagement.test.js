import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { store } from '../../redux/store.js';
import Drivers from '../management/Drivers.js';

describe('Driver Management page', () => {
  it('should render Login', () => {
    const elem = renderer
      .create(
        <Provider store={store}>
          <BrowserRouter>
            <Drivers />
          </BrowserRouter>
        </Provider>
      )
      .toJSON();
    expect(elem).toMatchSnapshot();
  });
});
