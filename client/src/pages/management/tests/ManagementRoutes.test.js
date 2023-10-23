import { shallow } from 'enzyme';
import React from 'react';
import Buses from '../Buses.js';
import Companies from '../Companies.js';
import Drivers from '../Drivers.js';
import Operators from '../Operators.js';
import Routes from '../Routes.js';

describe('Management routes', () => {
  it('Render routes', () => {
    const elem = shallow(<Routes />);
    expect(elem).toMatchSnapshot();
  });
  it('Render drivers', () => {
    const elem = shallow(<Drivers />);
    expect(elem).toMatchSnapshot();
  });
  it('Render companies', () => {
    const elem = shallow(<Companies />);
    expect(elem).toMatchSnapshot();
  });
  it('Render buses', () => {
    const elem = shallow(<Buses />);
    expect(elem).toMatchSnapshot();
  });
  it('Render Operators', () => {
    const elem = shallow(<Operators />);
    expect(elem).toMatchSnapshot();
  });
});
