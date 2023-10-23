import { render } from '@testing-library/react';
import ProviderWrapper from '@utils/TestUtil';
import React from 'react';
import Management from '../Management.js';
import Roles from '../RolesPage.js';

describe('Management & Roles', () => {
  it('Render the management', () => {
    const elem = render(<ProviderWrapper children={<Management />} />);
    expect(elem).toMatchSnapshot();
  });
  it('Render the role page', () => {
    const elem = render(<ProviderWrapper children={<Roles />} />);
    expect(elem).toMatchSnapshot();
  });
});
