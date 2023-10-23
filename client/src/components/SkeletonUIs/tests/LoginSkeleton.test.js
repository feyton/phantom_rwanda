import React from 'react';
import renderer from 'react-test-renderer';
import LoginSkeleton from '../LoginSkeleton.js';

describe('LanguageButton', () => {
  it('should render LanguageButton', () => {
    const loginSkeleton = renderer.create(<LoginSkeleton />).toJSON();
    expect(loginSkeleton).toMatchSnapshot();
  });
});
