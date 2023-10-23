import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import DriverManagement from '../DriverManagement.js';

describe('Bus Management test', () => {
  it('Should render drivers management page', () => {
    const elem = renderer
      .create(
        <BrowserRouter>
          <DriverManagement />
        </BrowserRouter>
      )
      .toJSON();
    expect(elem).toMatchSnapshot();
  });
  it('should edit a bus', async () => {
    const handleEditMock = jest.fn();
    const elem = render(
      <BrowserRouter>
        <DriverManagement handleEdit={handleEditMock} />
      </BrowserRouter>
    );
    fireEvent.change(await screen.findByRole('select'), {
      target: { value: 'edit' }
    });
    expect(elem).toMatchSnapshot();
  });
  it('Should delete a driver', async () => {
    const handleDeleteMock = jest.fn();
    const elem = render(
      <BrowserRouter>
        <DriverManagement handleDelete={handleDeleteMock} />
      </BrowserRouter>
    );
    fireEvent.change(await screen.findByRole('select'), {
      target: { value: 'delete' }
    });
    const r = new Promise((resolve) => setTimeout(resolve, 1000));
    await r;
    expect(elem).toMatchSnapshot();
  });
  it('Should delete a driver', async () => {
    const handleDeleteMock = jest.fn();
    jest.mock('axios');
    const axiosMock = jest.fn(() => Promise.resolve({}));
    const elem = render(
      <BrowserRouter>
        <DriverManagement handleDelete={handleDeleteMock} axios={axiosMock} />
      </BrowserRouter>
    );
    fireEvent.change(await screen.findByRole('select'), {
      target: { value: 'delete' }
    });
    const r = new Promise((resolve) => setTimeout(resolve, 1000));
    await r;
    expect(elem).toMatchSnapshot();
  });
});
