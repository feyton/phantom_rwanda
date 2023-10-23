import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { mount } from 'enzyme';
import mockAxios from 'jest-mock-axios';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import renderer, { act } from 'react-test-renderer';
import { store } from '../../redux/store.js';
import Login from '../Login.js';

afterEach(() => {
  mockAxios.reset();
});
const navigateMock = () => {
  return jest.fn();
};
const wrapper = renderer.create(
  <Provider store={store}>
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  </Provider>
);
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

jest.mock('react-hook-form', () => ({
  ...jest.requireActual('react-hook-form'),
  register: jest.fn(),
  handleSubmit: jest.fn()
}));
const mockUseLocationValue = {
  pathname: '/testroute',
  search: '',
  hash: '',
  state: null
};
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn().mockImplementation(() => {
    return mockUseLocationValue;
  })
}));

describe('Render the errors', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Login navigate={navigateMock} onValid={jest.fn()} />
        </BrowserRouter>
      </Provider>
    );
  });
  it('Render email error', async () => {
    fireEvent.submit(screen.getByTestId('loginForm'));
    expect(await screen.findAllByText(/Email is required/i)).toHaveLength(1);
  });
  it('Should not display errors when the form is valid', async () => {
    fireEvent.input(screen.getByTestId('email'), {
      target: {
        value: 'test@gmail.com'
      }
    });
    fireEvent.input(screen.getByTestId('password'), {
      target: {
        value: 'Test@123'
      }
    });
    fireEvent.submit(screen.getByTestId('loginForm'));
    mockAxios.mockResolvedValue({
      data: []
    });
    await waitFor(() => {
      expect(screen.queryAllByText(/Enter a valid email/i)).toHaveLength(0);
    });
  });
});

describe('Login snapshot test', () => {
  it('should render Login', () => {
    const elem = renderer
      .create(
        <Provider store={store}>
          <BrowserRouter>
            <Login />
          </BrowserRouter>
        </Provider>
      )
      .toJSON();
    expect(elem).toMatchSnapshot();
  });
  it('test the onValid function', () => {
    const onValid = jest.fn(wrapper.getInstance(), 'onValid');
    expect(onValid).toMatchSnapshot();
  });
});

describe('Attempts', () => {
  it('Should return an attempts error', async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <BrowserRouter>
            <Login navigate={navigateMock} />
          </BrowserRouter>
        </Provider>
      );
      fireEvent.input(screen.getByTestId('email'), {
        target: {
          value: 'test@gmail.com'
        }
      });
      fireEvent.submit(screen.getByTestId('loginForm'));
      expect(await screen.findAllByText(/Password is required/i)).toHaveLength(
        1
      );
      fireEvent.submit(screen.getByTestId('loginForm'));
      expect(await screen.findAllByText(/Password is required/i)).toHaveLength(
        1
      );
      fireEvent.submit(screen.getByTestId('loginForm'));
      expect(await screen.findAllByText(/Password is required/i)).toHaveLength(
        1
      );
      fireEvent.submit(screen.getByTestId('loginForm'));
      expect(
        await screen.findAllByText(/Wrong attempts of more than 3 times./i)
      ).toHaveLength(1);
      fireEvent.submit(screen.getByTestId('loginForm'));
      expect(
        await screen.findAllByText(/Wrong attempts of more than 3 times./i)
      ).toHaveLength(1);
      fireEvent.submit(screen.getByTestId('loginForm'));
      expect(await screen.findAllByText(/Unlock in 5 minutes/i)).toHaveLength(
        1
      );
      fireEvent.submit(screen.getByTestId('loginForm'));
      expect(
        await screen.findAllByText(/Try again in 5 minutes/i)
      ).toHaveLength(1);
    });
  });
});

describe('Login page functionality tests', () => {
  const handleSubmitMock = jest.fn();
  const wrapper = mount(
    <Provider store={store}>
      <MemoryRouter>
        <Login handleSubmit={handleSubmitMock()} />)
      </MemoryRouter>
    </Provider>
  );
  const simulateOnChangeInput = (wrapper, inputSelector, newValue) => {
    const input = wrapper.find(inputSelector);
    input.simulate('change', {
      target: { value: newValue }
    });
  };
  const loginBtn = wrapper.find('#login-btn');
  it('calls handleSubmit function on form submit', async () => {
    await act(() => {
      loginBtn.simulate('click');
      expect(handleSubmitMock).toBeCalledTimes(1);
    });
  });
});
