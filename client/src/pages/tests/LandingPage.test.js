import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import { MemoryRouter } from 'react-router-dom';
import LandingPage from '../LandingPage.js';

describe('Landing page test', () => {
  it('renders without crashing', () => {
    shallow(<LandingPage />);
  });
  it('should render LandingPage', () => {
    const elem = renderer
      .create(
        <MemoryRouter>
          <LandingPage />
        </MemoryRouter>
      )
      .toJSON();
    expect(elem).toMatchSnapshot();
  });
});
