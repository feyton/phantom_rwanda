import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import UpdateBus from '../UpdateBus.js';

const mockUseLocationValue = {
  state: {
    busType: 'Minibus',
    company: 'Virunga_express',
    seats: '30',
    plateNumber: 'TAN123',
    id: 3
  }
};
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn().mockImplementation(() => {
    return mockUseLocationValue;
  })
}));
describe('RegisterBus component test', () => {
  it('it should render update bus page', () => {
    const elem = renderer
      .create(
        <MemoryRouter>
          <UpdateBus />
        </MemoryRouter>
      )
      .toJSON();
    expect(elem).toMatchSnapshot();
  });
});
