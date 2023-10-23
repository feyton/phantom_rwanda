import {
  dashboardReducer,
  setDashboarddata,
  setNotifications
} from '../dashboardReducer.js';

describe('dashboard reducer Tests', () => {
  it('Should display default Values', () => {
    expect(dashboardReducer(undefined, {})).toEqual({
      info: {},
      notifications: []
    });
  });

  it('should set new states on setDashboarddata', () => {
    expect(
      dashboardReducer(
        {
          info: {}
        },
        setDashboarddata
      )
    ).toEqual({
      info: setDashboarddata.payload
    });
  });

  it('should set new states on setDashboarddata', () => {
    expect(
      dashboardReducer(
        {
          notifications: []
        },
        setNotifications
      )
    ).toEqual({
      notifications: setNotifications.payload
    });
  });
});
