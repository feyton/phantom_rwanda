import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import renderer, { act } from 'react-test-renderer';
import { store } from '../../../redux/store.js';
import UpdateProfile from '../UpdateProfile.js';

describe('UpdateProfile', () => {
  const wrapper = renderer.create(
    <Provider store={store}>
      <MemoryRouter>
        <UpdateProfile />
      </MemoryRouter>
    </Provider>
  );
  it('should render the UpdateProfile component', () => {
    const elem = renderer
      .create(
        <Provider store={store}>
          <MemoryRouter>
            <UpdateProfile />
          </MemoryRouter>
        </Provider>
      )
      .toJSON();
    expect(elem).toMatchSnapshot();
  });
  it('test the handleUpdate function', () => {
    const handleUpdate = jest.fn(wrapper.getInstance(), 'handleUpdate');
    expect(handleUpdate).toMatchSnapshot();
  });
});

describe('UpdateProfile page functionality tests', () => {
  const handleUpdate = jest.fn();
  const wrapper = mount(
    <Provider store={store}>
      <MemoryRouter>
        <UpdateProfile handleUpdate={handleUpdate()} />
      </MemoryRouter>
    </Provider>
  );

  const form = wrapper.find('form');
  it('calls handleSubmit function on form submit', () => {
    act(() => {
      form.simulate('submit');
      expect(handleUpdate).toBeCalledTimes(1);
    });
  });
});

describe('Render the errors', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <UpdateProfile handleUpdate={jest.fn()} />
        </MemoryRouter>
      </Provider>
    );
  });
  it('Render email error', async () => {
    fireEvent.submit(screen.getByTestId('updateForm'));
    expect(
      await screen.findAllByText('A valid firstname is required')
    ).toHaveLength(1);
  });
  it('Should not display errors when the form is valid', async () => {
    fireEvent.input(screen.getByTestId('firstName'), {
      target: {
        value: 'Eric'
      }
    });
    fireEvent.input(screen.getByTestId('lastName'), {
      target: {
        value: 'SHEMA'
      }
    });
    fireEvent.submit(screen.getByTestId('updateForm'));
    await waitFor(() => {
      expect(
        screen.queryAllByText('A valid firstname is required')
      ).toHaveLength(0);
    });
  });
});
