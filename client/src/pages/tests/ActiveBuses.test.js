import React from 'react';
import { MapContainer } from 'react-leaflet';
import renderer from 'react-test-renderer';
import ProviderWrapper from '../../utils/TestUtil.js';
import ActiveBuses from '../ActiveBuses.js';

describe('ACTIVE BUSES', () => {
  it('Renders the component', () => {
    const elem = renderer
      .create(
        <ProviderWrapper>
          <MapContainer>
            <ActiveBuses />
          </MapContainer>
        </ProviderWrapper>
      )
      .toJSON();
    expect(elem).toMatchSnapshot();
  });
});
