import React from 'react';
import renderer from 'react-test-renderer';
import WithClickOutside from '../WithClickOutside.js';

describe('withClickOutside', () => {
  it('should render withClickOutside', () => {
    const withClickOutside = renderer
      .create(
        <div>
          <WithClickOutside />
        </div>
      )
      .toJSON();
    expect(withClickOutside).toMatchSnapshot();
  });
});
