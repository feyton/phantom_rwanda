import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import LabelComponent from '../LabelComponent.js';

describe('LabelComponent', () => {
  it('should render the LabelComponent component', () => {
    const elem = renderer
      .create(
        <MemoryRouter>
          <LabelComponent />
        </MemoryRouter>
      )
      .toJSON();
    expect(elem).toMatchSnapshot();
  });
});
