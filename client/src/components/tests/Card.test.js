import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import Card from '../Card.js';

describe('Card', () => {
  it('should render the Card component', () => {
    const card = renderer
      .create(
        <MemoryRouter>
          <Card />)
        </MemoryRouter>
      )
      .toJSON();
    expect(card).toMatchSnapshot();
  });
});
