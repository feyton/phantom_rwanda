import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import { store } from '../../../redux/store.js';
import UpdateOperator from '../UpdateOperator.js';

describe('UpdateOperator', () => {
  it('should render the UpdateOperator component', () => {
    const elem = renderer
      .create(
        <Provider store={store}>
          <MemoryRouter>
            <UpdateOperator />
          </MemoryRouter>
        </Provider>
      )
      .toJSON();
    expect(elem).toMatchSnapshot();
  });
});
