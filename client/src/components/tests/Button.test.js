import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import Button from '../Button.js';

const button = {
  name: 'start',
  email: 'bg-blue-300'
};

describe('Button', () => {
  it('it should render Button', () => {
    const btn = renderer.create(<Button />).toJSON();
    expect(btn).toMatchSnapshot();
  });
  it('accepts button props', () => {
    const wrapper = mount(<Button props={button} />);
    expect(wrapper.props().props).toEqual(button);
  });
  it('contains the button element', () => {
    const wrapper = mount(<Button props={button} />);
    const value = wrapper.children().length;
    expect(value).toEqual(1);
  });
});
