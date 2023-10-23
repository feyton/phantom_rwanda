import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import RouteComponent from '../RouteComponent.js';

describe('Route Component ', () => {
  it('should render the Route component', () => {
    const elem = renderer
      .create(
        <MemoryRouter>
          <RouteComponent />
        </MemoryRouter>
      )
      .toJSON();
    expect(elem).toMatchSnapshot();
  });

  it('should render the Button component', () => {
    const wrapper = mount(
      <MemoryRouter>
        <RouteComponent />
      </MemoryRouter>
    );
    expect(wrapper.find('Button').length).toEqual(1);
  });
});
