import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { MapContainer } from 'react-leaflet';
import RoutingMachine from '../RoutingMachine.js';

describe('RoutingMachine', () => {
  it('should render the RoutingMachine component', () => {
    const elem = renderer
      .create(
        <MapContainer>
          <MemoryRouter>
            <RoutingMachine />)
          </MemoryRouter>
        </MapContainer>
      )
      .toJSON();
    expect(elem).toMatchSnapshot();
  });
  it('should test instance of the routing machine', () => {
    const leafletInstance = null;
    const wrapper = mount(
      <MapContainer>
        <RoutingMachine />
      </MapContainer>
    );
    expect(wrapper.instance).not.toEqual(leafletInstance);
  });
});
