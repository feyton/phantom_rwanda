import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { RegisterDriverPage, RegisterOperatorPage } from '../RegisterPages.js';

describe('RegisterOperatorPages component test', () => {
  it('it should render RegisterOperator page', () => {
    const registerOperator = renderer
      .create(
        <MemoryRouter>
          <RegisterOperatorPage />
        </MemoryRouter>
      )
      .toJSON();
    expect(registerOperator).toMatchSnapshot();
  });
  it('it should render RegisterDriver page', () => {
    const elem = renderer
      .create(
        <MemoryRouter>
          <RegisterDriverPage />
        </MemoryRouter>
      )
      .toJSON();
    expect(elem).toMatchSnapshot();
  });
});
