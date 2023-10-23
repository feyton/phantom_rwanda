import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { store } from '../../redux/store.js';
import Header from '../Header.js';

describe('MobileMenu', () => {
  it('should render Mobile menu', () => {
    const mobileMenu = renderer
      .create(
        <Provider store={store}>
          <BrowserRouter>
            <Header />
          </BrowserRouter>
        </Provider>
      )
      .toJSON();
    expect(mobileMenu).toMatchSnapshot();
  });
});
