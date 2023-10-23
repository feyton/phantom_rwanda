import { authReducer, loginUser, logoutUser } from '../authReducer.js';

describe('Auth reducer tests', () => {
  it('Return the default values', () => {
    expect(authReducer(undefined, {})).toEqual({
      authenticated: false,
      user: null
    });
  });
  it('Login a user', () => {
    const prevState = [];
    expect(authReducer({}, loginUser({ firstName: 'fabrice' }))).toEqual({
      authenticated: true,
      user: {
        firstName: 'fabrice'
      }
    });
  });
  it('Logout a user', () => {
    const prevState = [];
    expect(authReducer({}, logoutUser())).toEqual({
      authenticated: false,
      user: null
    });
  });
});
