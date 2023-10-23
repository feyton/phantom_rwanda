import { fireEvent, render, screen } from '@testing-library/react';
import mockAxios from 'axios';
import { mount, shallow } from 'enzyme';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import renderer, { act } from 'react-test-renderer';
import ResetRouterLayout from '../accounts/AccountRouter.js';
import ResetFormPage from '../accounts/EmailForm.js';
import EmailSent from '../accounts/EmailSent.js';
import ResetNewPassword from '../accounts/NewPasswordForm.js';
import PasswordChanged from '../accounts/PasswordChanged.js';
import NotFound from '../NotFound.js';

const mockHandleEmail = jest.fn((email) => {
  return Promise.resolve(email);
});

const wrapper = shallow(
  <BrowserRouter>
    <ResetRouterLayout />
  </BrowserRouter>
);
describe('function testing', () => {
  let wrapper;

  it('Should return a errors', async () => {
    await act(async () => {
      wrapper = mount(
        <BrowserRouter>
          <ResetFormPage handleEmail={mockHandleEmail} />
        </BrowserRouter>
      );
      wrapper.find('form').simulate('submit');
      expect(await wrapper).toMatchSnapshot();
    });
  });
});

describe('Reset page layout', () => {
  it('Render without crashing', () => {
    expect(wrapper.length).toEqual(1);
  });
});

describe('Reset password layout', () => {
  it('should render all routes', () => {
    const elem = renderer
      .create(
        <BrowserRouter>
          <ResetRouterLayout />
        </BrowserRouter>
      )
      .toJSON();
    expect(elem).toMatchSnapshot();
  });
  it('should render the new password form', () => {
    const elem = renderer
      .create(
        <BrowserRouter>
          <ResetNewPassword />
        </BrowserRouter>
      )
      .toJSON();
    expect(elem).toMatchSnapshot();
  });
  it('should render the email sent notification', () => {
    const elem = renderer
      .create(
        <BrowserRouter>
          <EmailSent />
        </BrowserRouter>
      )
      .toJSON();
    expect(elem).toMatchSnapshot();
  });
  it('should render the email Form', () => {
    const elem = renderer
      .create(
        <BrowserRouter>
          <ResetNewPassword />
        </BrowserRouter>
      )
      .toJSON();
    expect(elem).toMatchSnapshot();
  });

  it('should render the success message', () => {
    const elem = renderer
      .create(
        <BrowserRouter>
          <PasswordChanged />
        </BrowserRouter>
      )
      .toJSON();
    expect(elem).toMatchSnapshot();
  });
});

describe('NotFound', () => {
  it('It renders without', () => {
    const elem = renderer.create(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );
    expect(elem).toMatchSnapshot();
  });
});
describe('Testing Library', () => {
  let elem;
  beforeEach(() => {
    elem = render(
      <BrowserRouter>
        <ResetFormPage handleEmail={mockHandleEmail} />
      </BrowserRouter>
    );
  });
  it('Should display required error when email is invalid', async () => {
    fireEvent.submit(screen.getByTestId('form'));
    expect(await screen.getAllByRole('alert')).toHaveLength(1);
    expect(mockHandleEmail).not.toBeCalled();
  });
  it('Should display an invalid email error', async () => {
    fireEvent.input(screen.getByRole('textbox', { name: /email/i }), {
      target: {
        value: 'test'
      }
    });
    fireEvent.submit(screen.getByTestId('form'));
    expect(await screen.findAllByRole('alert')).toHaveLength(1);
    expect(await screen.findAllByText('Invalid email')).toHaveLength(1);
  });
  it('Should submit the form when email is valid', async () => {
    fireEvent.input(screen.getByRole('textbox', { name: /email/i }), {
      target: {
        value: 'fab@me.com'
      }
    });
    fireEvent.submit(screen.getByTestId('form'));
    mockAxios.post.mockImplementationOnce(() => {
      return Promise.reject({
        status: 400,
        data: { data: { message: 'Email not found' } }
      });
    });
    expect(await screen.findAllByText('Sending')).toHaveLength(1);
  });
  it('Should submit the form and raise an error when email not found', async () => {
    fireEvent.input(screen.getByRole('textbox', { name: /email/i }), {
      target: {
        value: 'fab@me.com'
      }
    });
    fireEvent.submit(screen.getByTestId('form'));
    expect(await screen.findAllByText('Sending')).toHaveLength(1);
    mockAxios.post.mockImplementationOnce(() => {
      return Promise.resolve({
        status: 200,
        data: { data: { message: 'Link is sent' } }
      });
    });
    expect(elem).toMatchSnapshot();
  });
});
