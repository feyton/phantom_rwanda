import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { store } from '../../redux/store.js';
import { LinkBus } from '../LinkBus.js';

const rowData = {
  original: {
    assigned_bus: null
  }
};

describe('linkBus', () => {
  it('should render Mobile menu', () => {
    const linkBus = renderer
      .create(
        <Provider store={store}>
          <BrowserRouter>
            <LinkBus row={rowData} />
          </BrowserRouter>
        </Provider>
      )
      .toJSON();
    expect(linkBus).toMatchSnapshot();
  });
});
