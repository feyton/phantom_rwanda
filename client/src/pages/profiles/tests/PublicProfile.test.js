import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import PublicProfile from '../PublicProfile.js';

describe('PublicProfile', () => {
  it('should render the PublicProfile component', () => {
    const elem = renderer
      .create(
        <MemoryRouter>
          <PublicProfile />
        </MemoryRouter>
      )
      .toJSON();
    expect(elem).toMatchSnapshot();
  });
});
