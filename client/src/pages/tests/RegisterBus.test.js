import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { mount } from 'enzyme';
import RegisterBus from '../RegisterBus.js';

describe('RegisterBus component test', () => {
  it('it should render Register bus page', () => {
    const elem = renderer
      .create(
        <MemoryRouter>
          <RegisterBus />
        </MemoryRouter>
      )
      .toJSON();
    expect(elem).toMatchSnapshot();
  });
});
describe('RegisterBus component test', () => {
  const busInfo = {
    busType: 'Coaster',
    plateNumber: 'RAB1234',
    seats: '30'
  };
  const registerBusToDBMock = jest.fn();

  it('it should register bus to database', () => {
    const elem = render(
      <MemoryRouter>
        <RegisterBus registerBusToDB={registerBusToDBMock(busInfo)} />
      </MemoryRouter>
    );
    expect(elem).toMatchSnapshot();
  });
  it('It should test the registerBusToDB function', () => {
    const registerBusToDB = jest.fn();
    const component = mount(
      <MemoryRouter>
        <RegisterBus registerBusToDB={registerBusToDB()} />
      </MemoryRouter>
    );
    const form = component.find('form');
    form.simulate('submit');
    expect(registerBusToDB).toBeCalledTimes(1);
  });
});
