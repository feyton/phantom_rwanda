import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import ComingSoon from '../ComingSoon.js';

describe('Comming soon ', () => {
  it('Should render coming soon page', () => {
    const elem = renderer
      .create(
        <BrowserRouter>
          <ComingSoon />
        </BrowserRouter>
      )
      .toJSON();
    expect(elem).toMatchSnapshot();
  });
});
