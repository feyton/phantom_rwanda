import { FormComponent } from '@components/FormComponent.js';
import { driverInputs } from '@pages/forms/FormInputs.js';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { mount, shallow } from 'enzyme';
import React from 'react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import UpdateDriver from '../../forms/UpdateDriver.js';
import UpdateOperator from '../../forms/UpdateOperator.js';

describe('Form Component', () => {
  it('Should render a form Componet', () => {
    const elem = renderer
      .create(
        <MemoryRouter>
          <FormComponent />
        </MemoryRouter>
      )
      .toJSON();
    expect(elem).toMatchSnapshot();
  });
});

describe('Form Components and actions', () => {
  it('should render a Button of Submit', () => {
    const wrapper = mount(
      <MemoryRouter>
        <FormComponent />
      </MemoryRouter>
    );
    expect(wrapper.find('#btn').length).toEqual(1);
  });

  it('should render a Label Component', () => {
    const wrapper = mount(
      <MemoryRouter>
        <FormComponent inputs={driverInputs} />
      </MemoryRouter>
    );
    expect(wrapper.find('LabelComponent').length).toEqual(7);
  });
});

describe('Form Component Action', () => {
  const inputs = [
    [
      {
        id: 'firstname',
        pattern: /^[a-zA-Z][a-zA-Z ]{3,32}$/i,
        labelName: 'First name',
        type: 'text',
        name: 'firstname',
        message: 'A valid firstname is required',
        placeholder: 'Vedaste'
      },
      {
        id: 'lastname',
        pattern: /^[a-zA-Z][a-zA-Z ]{3,32}$/i,
        labelName: 'Last name',
        type: 'text',
        name: 'lastname',
        message: 'A valid lastname is required'
      }
    ]
  ];
  const callbackMock = jest.fn(() => Promise.resolve({ data: {} }));
  beforeEach(() => {
    render(
      <BrowserRouter>
        <FormComponent
          type="Test"
          redirect="/test"
          inputs={inputs}
          callback={callbackMock}
        />
      </BrowserRouter>
    );
  });
  it('Render the details', async () => {
    fireEvent.submit(screen.getByTestId('form'));
    expect(
      await screen.findAllByText(/A valid firstname is required/i)
    ).toHaveLength(1);
  });
  it('Should submit', async () => {
    fireEvent.input(screen.getByTestId('firstname'), {
      target: {
        value: 'Fabrice'
      }
    });
    fireEvent.input(screen.getByTestId('lastname'), {
      target: {
        value: 'Fabrice'
      }
    });
    fireEvent.submit(screen.getByTestId('form'));
    await waitFor(() => {
      expect(
        screen.queryAllByText(/A valid firstname is required/i)
      ).toHaveLength(0);
      expect(callbackMock).toBeCalled();
    });
  });
});

describe('Testingfull form', () => {
  const inputs = [
    [
      {
        id: 'firstname',
        pattern: /^[a-zA-Z][a-zA-Z ]{3,32}$/i,
        labelName: 'First name',
        type: 'text',
        name: 'firstname',
        message: 'A valid firstname is required',
        placeholder: 'Vedaste'
      }
    ],
    [
      {
        id: 'lastname',
        pattern: /^[a-zA-Z][a-zA-Z ]{3,32}$/i,
        labelName: 'First name',
        type: 'text',
        name: 'lastname',
        message: 'A valid lastname is required'
      }
    ]
  ];
  beforeEach(() => {
    render(
      <BrowserRouter>
        <FormComponent
          redirect="/test"
          callback={jest.fn()}
          type="Test"
          inputs={inputs}
        />
      </BrowserRouter>
    );
  });

  it('Should highlight all errors', async () => {
    fireEvent.submit(screen.getByTestId('form'));
    expect(
      await screen.findAllByText(/A valid firstname is required/i)
    ).toHaveLength(1);
  });
});

describe('Render the update', () => {
  it('render the update driver', () => {
    const elem = shallow(<UpdateDriver />);
    expect(elem).toMatchSnapshot();
  });
  it('render the update operator', () => {
    const elem = shallow(<UpdateOperator />);
    expect(elem).toMatchSnapshot();
  });
});
