import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { store } from '../../redux/store.js';
import SideBar from '../SideBar.js';

describe('SideBar', () => {
  it('should render the SideBar component', () => {
    const elem = renderer
      .create(
        <Provider store={store}>
          <MemoryRouter>
            <SideBar />
          </MemoryRouter>
        </Provider>
      )
      .toJSON();
    expect(elem).toMatchSnapshot();
  });
  it('It should test the setopen function', () => {
    const open = false;
    const setOpen = jest.fn();
    const component = mount(
      <Provider store={store}>
        <MemoryRouter>
          <SideBar setOpen={() => setOpen(!open)} />
        </MemoryRouter>
      </Provider>
    );
    const button = component.find('#button');
    button.simulate('click');
    expect(setOpen).not.toBeCalledTimes(1);
  });
});
