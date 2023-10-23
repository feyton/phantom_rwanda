import { mount } from 'enzyme';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import RouteEdit from '../RouteEdit.js';

const route = {
  origin: 'Kimironko',
  destination: 'Down-town',
  distance: 30
};

const mockUseLocationValue = {
  pathname: '/testroute',
  search: '',
  hash: '',
  state: { route }
};
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn().mockImplementation(() => {
    return mockUseLocationValue;
  })
}));

describe('Edit Page', () => {
  it('should render the Edit component', () => {
    const elem = renderer
      .create(
        <MemoryRouter>
          <RouteEdit />
        </MemoryRouter>
      )
      .toJSON();
    expect(elem).toMatchSnapshot();
  });

  it('should render the Route component', () => {
    const wrapper = mount(
      <MemoryRouter>
        <RouteEdit />
      </MemoryRouter>
    );
    expect(wrapper.find('RouteComponent').length).toEqual(1);
  });
});
