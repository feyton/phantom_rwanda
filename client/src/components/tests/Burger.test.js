import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import Burger from '../Burger.js';

describe('Burger Component', () => {
  it('should have a burger component', () => {
    const wrapper = mount(
      <MemoryRouter>
        <Burger />
      </MemoryRouter>
    );
    const value = wrapper.children().length;
    expect(value).toEqual(1);
  });
  it('it should render the Burger component', () => {
    const burger = renderer
      .create(
        <MemoryRouter>
          <Burger />
        </MemoryRouter>
      )
      .toJSON();
    expect(burger).toMatchSnapshot();
  });
});
