import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../../redux/store.js';
import OperatorProfile from '../OperatorProfile.js';

describe('OperatorProfile', () => {
  it('should render the OperatorProfile component', () => {
    const elem = renderer
      .create(
        <Provider store={store}>
          <MemoryRouter>
            <OperatorProfile />
          </MemoryRouter>
        </Provider>
      )
      .toJSON();
    expect(elem).toMatchSnapshot();
  });
});
