import ProviderWrapper from '@utils/TestUtil.js';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import Driver from '../Driver.js';
import Operator from '../Operator.js';

describe('Registration', () => {
  describe('Operators', () => {
    it('Should render the operator form', () => {
      const elem = renderer
        .create(
          <BrowserRouter>
            <Operator />
          </BrowserRouter>
        )
        .toJSON();
      expect(elem).toMatchSnapshot();
    });
  });
  describe('Driver', () => {
    it('Should render the operator form', () => {
      const elem = renderer
        .create(<ProviderWrapper children={<Driver />} />)
        .toJSON();
      expect(elem).toMatchSnapshot();
    });
  });
});
