import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { store } from '../../redux/store.js';
import Header from '../Header.js';

describe('Header', () => {
  it('should render Header', () => {
    const header = renderer
      .create(
        <Provider store={store}>
          <MemoryRouter>
            <Header />
          </MemoryRouter>
        </Provider>
      )
      .toJSON();
    expect(header).toMatchSnapshot();
  });

  it('It should test the setOpen function', () => {
    const setOpen = jest.fn();
    const component = mount(
      <Provider store={store}>
        <MemoryRouter>
          <Header setOpen={setOpen()} />
        </MemoryRouter>
      </Provider>
    );
    const button = component.find('#toggle');
    button.simulate('click');
    expect(setOpen).toBeCalledTimes(1);
  });

  it('It should test the open status', () => {
    const open = true;
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <Header open={open} />
        </MemoryRouter>
      </Provider>
    );
    const img = wrapper.find('img');
    expect(img.length).toEqual(1);
  });
});
