import React from 'react';
import renderer from 'react-test-renderer';
import Input from '../Input.js';

describe('Input', () => {
  it('should render Input', () => {
    const input = renderer.create(<Input />).toJSON();
    expect(input).toMatchSnapshot();
  });
});
