import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import * as ReactRedux from 'react-redux';
import { mount } from 'enzyme';
import { fireEvent, render, screen } from '@testing-library/react';
import { store } from '../../../redux/store.js';
import Profile from '../Profile.js';

describe('Profile', () => {
  it('should render the Profile component', () => {
    const elem = renderer
      .create(
        <Provider store={store}>
          <MemoryRouter>
            <Profile />
          </MemoryRouter>
        </Provider>
      )
      .toJSON();
    expect(elem).toMatchSnapshot();
  });
  it('It should test the setOpen function', () => {
    const onChange = jest.fn();
    const component = mount(
      <Provider store={store}>
        <MemoryRouter>
          <Profile onChange={onChange()} />
        </MemoryRouter>
      </Provider>
    );
    const button = component.find('#photo-upload');
    button.simulate('click');
    expect(onChange).toBeCalledTimes(1);
  });
  it('It should test the dispatch function', () => {
    const elem = render(
      <Provider store={store}>
        <MemoryRouter>
          <Profile />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.click(screen.getByTestId('photo-upload'));
    expect(elem).toMatchSnapshot();
  });
});

describe('Profile page functionality tests', () => {
  const onChangeMock = jest
    .spyOn(FileReader.prototype, 'readAsDataURL')
    .mockImplementation(() => null);
  const event = {
    target: {
      files: [
        {
          name: 'image.png',
          size: 50000,
          type: 'image/png'
        }
      ]
    }
  };

  const wrapper = mount(
    <Provider store={store}>
      <MemoryRouter>
        <Profile onChange={onChangeMock()} />)
      </MemoryRouter>
    </Provider>
  );

  const uploadBtn = wrapper.find('#photo-upload');
  it('calls handleSubmit function on form submit', () => {
    act(() => {
      uploadBtn.simulate('change', event);
      expect(onChangeMock).toBeCalledTimes(1);
    });
  });
});
