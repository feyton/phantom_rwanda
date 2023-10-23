import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import SkeletonScreen from '../SkeletonScreen.js';

const component = (
  <MemoryRouter>
    <SkeletonScreen />
  </MemoryRouter>
);

describe('SkeletonScreen', () => {
  it('should render SkeletonScreen', () => {
    const skelUI = renderer.create(component).toJSON();
    expect(skelUI).toMatchSnapshot();
  });
});
