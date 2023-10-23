import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import LandPageSkelUI from '../LandPageSkelUI.js';

const component = (
  <MemoryRouter>
    <LandPageSkelUI />
  </MemoryRouter>
);

describe('Landing Page Skeleton UI', () => {
  it('should render Landing Page Skeleton UI', () => {
    const skelUI = renderer.create(component).toJSON();
    expect(skelUI).toMatchSnapshot();
  });
});
