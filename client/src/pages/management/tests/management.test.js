import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import Buses from '../Buses.js';
import Companies from '../Companies.js';
import Drivers from '../Drivers.js';
import { store } from '../../../redux/store.js';
import Operators from '../Operators.js';
import Routes from '../Routes.js';

describe('Management tests', () => {
  it('it should render Buses Management page', () => {
    const registerOperator = renderer
      .create(
        <Provider store={store}>
          <MemoryRouter>
            <Buses />
          </MemoryRouter>
        </Provider>
      )
      .toJSON();
    expect(registerOperator).toMatchSnapshot();
  });
  it('it should render Companies Management page', () => {
    const elem = renderer
      .create(
        <Provider store={store}>
          <MemoryRouter>
            <Companies />
          </MemoryRouter>
        </Provider>
      )
      .toJSON();
    expect(elem).toMatchSnapshot();
  });
  it('it should render Drivers Management page', () => {
    const registerOperator = renderer
      .create(
        <Provider store={store}>
          <MemoryRouter>
            <Drivers />
          </MemoryRouter>
        </Provider>
      )
      .toJSON();
    expect(registerOperator).toMatchSnapshot();
  });
  it('it should render Routes Management page', () => {
    const elem = renderer
      .create(
        <Provider store={store}>
          <MemoryRouter>
            <Routes />
          </MemoryRouter>
        </Provider>
      )
      .toJSON();
    expect(elem).toMatchSnapshot();
  });
  it('it should render Operators Management page', () => {
    const elem = renderer
      .create(
        <Provider store={store}>
          <MemoryRouter>
            <Operators />
          </MemoryRouter>
        </Provider>
      )
      .toJSON();
    expect(elem).toMatchSnapshot();
  });
});
