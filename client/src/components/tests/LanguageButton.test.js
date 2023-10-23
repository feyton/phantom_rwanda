import React from 'react';
import renderer from 'react-test-renderer';
import LanguageButton from '../LanguageButton.js';

describe('LanguageButton', () => {
  it('should render LanguageButton', () => {
    const LanguageBtn = renderer.create(<LanguageButton />).toJSON();
    expect(LanguageBtn).toMatchSnapshot();
  });
});
