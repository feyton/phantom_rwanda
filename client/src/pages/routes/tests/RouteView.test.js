import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import RouteView from '../RouteView.js';

const mockedUsedLocation = {
  state: { route: { destination1: 'Remera', destination2: 'Kacyiru' } }
};
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn().mockImplementation(() => {
    return mockedUsedLocation;
  })
}));

describe('View Page', () => {
  it('should render the View component', () => {
    const elem = renderer
      .create(
        <MemoryRouter>
          <RouteView />
        </MemoryRouter>
      )
      .toJSON();
    expect(elem).toMatchSnapshot();
  });

  it('should render the Map MapContainer component', () => {
    const wrapper = mount(
      <MemoryRouter>
        <RouteView />
      </MemoryRouter>
    );
    expect(wrapper.find('MapContainer').length).toEqual(1);
  });
});
