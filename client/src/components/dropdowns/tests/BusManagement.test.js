import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import BusManagement from '../BusManagement.js';

describe('BusManagement', () => {
  const row = {
    original: {
      busType: 'Coaster',
      plateNumber: 'RAB1234',
      seats: '30',
      driver: null,
      route: null
    }
  };
  it('Should render bus management page', () => {
    const elem = renderer
      .create(
        <BrowserRouter>
          <BusManagement row={row} />
        </BrowserRouter>
      )
      .toJSON();
    expect(elem).toMatchSnapshot();
  });
  it('should edit a bus', async () => {
    const handleEditMock = jest.fn();
    const elem = render(
      <BrowserRouter>
        <BusManagement row={row} handleEdit={handleEditMock} />
      </BrowserRouter>
    );
    fireEvent.change(await screen.findByRole('select'), {
      target: { value: 'edit' }
    });
    expect(elem).toMatchSnapshot();
  });
  it('Should delete a bus', async () => {
    const handleDeleteMock = jest.fn();
    const elem = render(
      <BrowserRouter>
        <BusManagement row={row} handleDelete={handleDeleteMock} />
      </BrowserRouter>
    );
    fireEvent.change(await screen.findByRole('select'), {
      target: { value: 'delete' }
    });
    const r = new Promise((resolve) => setTimeout(resolve, 1000));
    await r;
    expect(elem).toMatchSnapshot();
  });
  it('Should delete a bus', async () => {
    const handleDeleteMock = jest.fn();
    jest.mock('axios');
    const axiosMock = jest.fn(() => Promise.resolve({}));
    const elem = render(
      <BrowserRouter>
        <BusManagement
          row={row}
          handleDelete={handleDeleteMock}
          axios={axiosMock}
        />
      </BrowserRouter>
    );
    fireEvent.change(await screen.findByRole('select'), {
      target: { value: 'delete' }
    });
    expect(elem).toMatchSnapshot();
  });
});
