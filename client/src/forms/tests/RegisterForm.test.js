import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { shallow } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import LabelComponent from '../../components/LabelComponent.js';
import Driver from '../../pages/dashboard/Driver.js';
import Operator from '../../pages/dashboard/Operator.js';
import RegisterDriver from '../../pages/forms/RegisterDrivers.js';
import RegisterOperator from '../../pages/forms/RegisterOperator.js';
import { store } from '../../redux/store.js';

describe('Registration', () => {
  describe('Operators', () => {
    it('Should render the operator form', () => {
      const elem = renderer
        .create(
          <BrowserRouter>
            <Operator />
          </BrowserRouter>
        )
        .toJSON();
      expect(elem).toMatchSnapshot();
    });

    it('Should render the Register Driver component', () => {
      const elem = renderer
        .create(
          <Provider store={store}>
            <BrowserRouter>
              <Driver />
            </BrowserRouter>
          </Provider>
        )
        .toJSON();
      expect(elem).toMatchSnapshot();
    });

    it('Should render the driver form', () => {
      const elem = renderer
        .create(
          <Provider store={store}>
            <BrowserRouter>
              <Driver />
            </BrowserRouter>
          </Provider>
        )
        .toJSON();
      expect(elem).toMatchSnapshot();
    });
  });

  describe('Component', () => {
    const wrapper = shallow(<LabelComponent htmlFor="test" name="test" />);
    it('Should return test', () => {
      expect(wrapper.text()).toEqual('test');
    });
  });
});

describe('Testing functionality for driver', () => {
  it('Should return a handleDriver function', async () => {
    const handleDriverMock = jest.fn(() => Promise.resolve({ data: {} }));

    render(
      <BrowserRouter>
        <RegisterDriver handleDriver={handleDriverMock} />
      </BrowserRouter>
    );
    fireEvent.input(screen.getByTestId('firstname'), {
      target: {
        value: 'Fabrice'
      }
    });
    fireEvent.input(screen.getByTestId('lastname'), {
      target: {
        value: 'Hafashimana'
      }
    });
    fireEvent.input(screen.getByTestId('email'), {
      target: {
        value: 'admin@me.com'
      }
    });
    fireEvent.input(screen.getByTestId('mobileNumber'), {
      target: {
        value: '0788000000'
      }
    });
    fireEvent.input(screen.getByTestId('address'), {
      target: {
        value: 'Kigali'
      }
    });
    fireEvent.input(screen.getByTestId('nationalid'), {
      target: {
        value: '1199080030000040'
      }
    });
    fireEvent.input(screen.getByTestId('license'), {
      target: {
        value: '1199080030000040'
      }
    });

    fireEvent.submit(screen.getByTestId('form'));
    await waitFor(() => {
      expect(
        screen.queryAllByText(/A valid firstname is required/i)
      ).toHaveLength(0);
    });
  });
});
describe('Testing functionality for operator', () => {
  it('Should return a handleDriver function', async () => {
    const handleDriverMock = jest.fn(() => Promise.resolve({ data: {} }));

    render(
      <BrowserRouter>
        <RegisterOperator handleReg={handleDriverMock} />
      </BrowserRouter>
    );
    fireEvent.input(screen.getByTestId('firstname'), {
      target: {
        value: 'Fabrice'
      }
    });
    fireEvent.input(screen.getByTestId('lastname'), {
      target: {
        value: 'Hafashimana'
      }
    });
    fireEvent.input(screen.getByTestId('email'), {
      target: {
        value: 'admin@me.com'
      }
    });
    fireEvent.input(screen.getByTestId('mobileNumber'), {
      target: {
        value: '0788000000'
      }
    });
    fireEvent.input(screen.getByTestId('address'), {
      target: {
        value: 'Kigali'
      }
    });
    fireEvent.input(screen.getByTestId('nationalID'), {
      target: {
        value: '1199080030000040'
      }
    });

    fireEvent.submit(screen.getByTestId('form'));
    await waitFor(() => {
      expect(
        screen.queryAllByText(/A valid firstname is required/i)
      ).toHaveLength(0);
    });
  });
});
