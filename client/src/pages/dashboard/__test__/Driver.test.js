import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { store } from '../../../redux/store.js';
import Driver from '../Driver.js';
import Operator from '../Operator.js';

describe('Registration', () => {
  describe('Operators', () => {
    it('Should render the operator form', () => {
      const elem = renderer
        .create(
          <BrowserRouter>
            <Driver />
          </BrowserRouter>
        )
        .toJSON();
      expect(elem).toMatchSnapshot();
    });
    it('Should render the driver form', () => {
      const elem = renderer
        .create(
          <Provider store={store}>
            <BrowserRouter>
              <Operator />
            </BrowserRouter>
          </Provider>
        )
        .toJSON();
      expect(elem).toMatchSnapshot();
    });
  });
});
