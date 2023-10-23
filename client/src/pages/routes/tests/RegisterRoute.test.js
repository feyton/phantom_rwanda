import { mount } from 'enzyme';
import { enableFetchMocks } from 'jest-fetch-mock';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import RegisterRoute from '../RegisterRoute.js';

enableFetchMocks();
describe('Register Page', () => {
  const navigateMock = () => {
    return jest.fn();
  };

  const mockedUsedNavigate = jest.fn();
  jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUsedNavigate
  }));
  const mockedUsedLocation = jest.fn();
  jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useLocation: () => mockedUsedLocation
  }));
  it('should render the register component', () => {
    const elem = renderer
      .create(
        <MemoryRouter>
          <RegisterRoute />
        </MemoryRouter>
      )
      .toJSON();
    expect(elem).toMatchSnapshot();
  });

  it('should render the Route component', () => {
    const wrapper = mount(
      <MemoryRouter>
        <RegisterRoute />
      </MemoryRouter>
    );
    expect(wrapper.find('RouteComponent').length).toEqual(1);
  });
  it('should Post data from In the database', async () => {
    const route = {
      destination1: 'Kabuga',
      destination2: 'Nyabugogo',
      distance: '20km'
    };
    global.fetch.mockResponseOnce(
      JSON.stringify({
        routes: {
          destination1: 'Kabuga',
          destination2: 'Nyabugogo',
          distance: '20km'
        }
      })
    );

    expect(global.fetch.mock.calls.length).toEqual(0);
  });
  it('It should test the registerRouteToDB function', () => {
    const registerRouteToDB = jest.fn();
    const component = mount(
      <MemoryRouter>
        <RegisterRoute registerRouteToDB={registerRouteToDB()} />
      </MemoryRouter>
    );
    const form = component.find('form');
    form.simulate('submit');
    expect(registerRouteToDB).toBeCalledTimes(1);
  });
});
