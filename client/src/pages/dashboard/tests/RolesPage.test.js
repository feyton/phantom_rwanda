import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import RolePage from '../RolesPage';

describe('Registration', () => {
  describe('Operators', () => {
    it('Should render the role page', () => {
      const elem = renderer
        .create(
          <BrowserRouter>
            <RolePage />
          </BrowserRouter>
        )
        .toJSON();
      expect(elem).toMatchSnapshot();
    });
  });
});
