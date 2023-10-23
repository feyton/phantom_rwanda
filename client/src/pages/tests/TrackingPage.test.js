import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { store } from '../../redux/store.js';
import TrackingPage from '../TrackingPage.js';

describe('TrackingPage', () => {
  it('should render TrackingPage', () => {
    const elem = renderer
      .create(
        <MemoryRouter>
          <Provider store={store}>
            <TrackingPage />
          </Provider>
        </MemoryRouter>
      )
      .toJSON();
    expect(elem).toMatchSnapshot();
  });

  it('It should test the handleRoute function', () => {
    const handleRoute = jest.fn();
    const event = {
      target: {
        origin: { value: 'some value' },
      }
    };
    const component = mount(
      <MemoryRouter>
        <Provider store={store}>
          <TrackingPage handleRoute={handleRoute()} />
        </Provider>
      </MemoryRouter>
    );
    const form = component.find('form');
    form.simulate('submit', event);
    expect(handleRoute).toBeCalledTimes(1);
  });

  it('It should test the handleChange function', () => {
    const handleChange = jest.fn();
    const component = mount(
      <MemoryRouter>
        <Provider store={store}>
          <TrackingPage handleChange={handleChange()} />
        </Provider>
      </MemoryRouter>
    );
    const form = component.find('#origin');
    form.simulate('change');
    expect(handleChange).toBeCalledTimes(1);
  });

});

describe('Tracking page', () => {


  it('should render the tracking page', () => {
    mount(
      <MemoryRouter>
        <Provider store={store}>
          <TrackingPage />
        </Provider>
      </MemoryRouter>
    );
  });
});

