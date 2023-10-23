import { render } from '@testing-library/react';
import ProviderWrapper from '@utils/TestUtil.js';
import { shallow } from 'enzyme';
import React from 'react';
import * as redux from 'react-redux';
import Roles from '../../pages/dashboard/RolesPage.js';
import CheckRole from '../../utils/CheckRoles.js';
import PrivateRoute from '../../utils/PrivateRoute.js';
import DashRoutes from '../DashboardRouter.js';
import MainRoutes from '../MainRoutes.js';
import ModalRoutes from '../ModalRoutes.js';

let spyOnUseSelector;

const mockUseLocationValue = {
  pathname: '/testroute',
  search: '',
  hash: '',
  state: null
};
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn().mockImplementation(() => {
    return mockUseLocationValue;
  })
}));
describe('Containers', () => {
  it('Render the main routes', () => {
    const elem = render(<ProviderWrapper children={<MainRoutes />} />);
    expect(elem).toMatchSnapshot();
  });
  it('Render the dashboard routes', () => {
    const elem = render(<ProviderWrapper children={<DashRoutes />} />);
    expect(elem).toMatchSnapshot();
  });
  it('Render the dashboard routes', () => {
    const elem = render(<ProviderWrapper children={<ModalRoutes />} />);
    expect(elem).toMatchSnapshot();
  });
});

describe('Private roles', () => {
  it('Should return a redirect to the login', () => {
    spyOnUseSelector = jest.spyOn(redux, 'useSelector');
    spyOnUseSelector.mockReturnValue({
      authenticated: false,
      user: null
    });

    const elem = shallow(<PrivateRoute children={<Roles />} />);
    expect(elem).toMatchSnapshot();
  });

  it('Should return the actual children', () => {
    spyOnUseSelector = jest.spyOn(redux, 'useSelector');
    spyOnUseSelector.mockReturnValue({
      authenticated: true,
      user: {}
    });

    const elem = shallow(<PrivateRoute children={<Roles />} />);
    expect(elem).toMatchSnapshot();
  });
});

describe('Private State', () => {
  it('Should return a redirect to the login', () => {
    spyOnUseSelector = jest.spyOn(redux, 'useSelector');
    spyOnUseSelector.mockImplementation((callback) =>
      callback({
        auth: {
          authenticated: false,
          user: null
        }
      })
    );
    const elem = shallow(<PrivateRoute children={<Roles />} />);
    expect(elem).toMatchSnapshot();
  });
});

describe('Check roles', () => {
  spyOnUseSelector = jest.spyOn(redux, 'useSelector');
  it('Return the element for the admin', () => {
    spyOnUseSelector.mockReturnValue({
      authenticated: true,
      user: {
        id: 2,
        firstName: 'Fabrice',
        email: 'admin@me.com',
        roles: {
          name: 'admin',
          permissions: [
            {
              driver: ['get', 'create', 'update', 'delete'],
              routes: ['get', 'create', 'update', 'delete'],
              buses: ['get', 'create', 'update', 'delete'],
              operator: ['get', 'create', 'update', 'delete'],
              company: ['get', 'create', 'update', 'delete']
            }
          ]
        }
      }
    });
    const elem = shallow(<CheckRole role={['admin']} children={<Roles />} />);
    expect(elem).toMatchSnapshot();
  });
  it('Return the element for the operator', () => {
    spyOnUseSelector.mockReturnValue({
      authenticated: true,
      user: {
        id: 2,
        firstName: 'Fabrice',
        email: 'admin@me.com',
        roles: {
          name: 'operator',
          permissions: [
            {
              driver: ['get', 'create', 'update', 'delete'],
              routes: ['get', 'create', 'update', 'delete'],
              buses: ['get', 'create', 'update', 'delete'],
              operator: ['get', 'create', 'update', 'delete'],
              company: ['get', 'create', 'update', 'delete']
            }
          ]
        }
      }
    });
    const elem = shallow(
      <CheckRole role={['operator']} children={<Roles />} />
    );
    expect(elem).toMatchSnapshot();
  });
  it('Return empty for for the operator', () => {
    spyOnUseSelector.mockReturnValue({
      authenticated: true,
      user: {
        id: 2,
        firstName: 'Fabrice',
        email: 'admin@me.com',
        roles: {
          name: 'operator',
          permissions: [
            {
              driver: ['get', 'create', 'update', 'delete'],
              routes: ['get', 'create', 'update', 'delete'],
              buses: ['get', 'create', 'update', 'delete'],
              operator: ['get', 'create', 'update', 'delete'],
              company: ['get', 'create', 'update', 'delete']
            }
          ]
        }
      }
    });
    const elem = shallow(
      <CheckRole type="page" role={['admin']} children={<Roles />} />
    );
    expect(elem).toMatchSnapshot();
  });
  it('Return empty for for the operator', () => {
    spyOnUseSelector.mockReturnValue({
      authenticated: true,
      user: {
        id: 2,
        firstName: 'Fabrice',
        email: 'admin@me.com',
        roles: {
          name: 'operator',
          permissions: [
            {
              driver: ['get', 'create', 'update', 'delete'],
              routes: ['get', 'create', 'update', 'delete'],
              buses: ['get', 'create', 'update', 'delete'],
              operator: ['get', 'create', 'update', 'delete'],
              company: ['get', 'create', 'update', 'delete']
            }
          ]
        }
      }
    });
    const elem = shallow(<CheckRole role={['admin']} children={<Roles />} />);
    expect(elem).toMatchSnapshot();
  });
});
