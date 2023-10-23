import { mount } from 'enzyme';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import Buses from '../Buses.js';

describe('Buses form component test', () => {
  it('it should render Buses form component', () => {
    const busesForm = renderer
      .create(
        <MemoryRouter>
          <Buses />
        </MemoryRouter>
      )
      .toJSON();
    expect(busesForm).toMatchSnapshot();
  });
});
