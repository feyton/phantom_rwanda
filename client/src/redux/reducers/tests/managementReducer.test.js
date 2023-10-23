import {
  managementReducer,
  resetTab,
  setActiveTab
} from '../managementReducer.js';

describe('Management Reducer', () => {
  it('return default value', () => {
    expect(managementReducer(undefined, {})).toEqual({
      tabIndex: 0
    });
  });
  it('Change active tab', () => {
    const prevState = {};
    expect(managementReducer(prevState, setActiveTab(2))).toEqual({
      tabIndex: 2
    });
  });
  it('Reset to zero', () => {
    const prevState = {};
    expect(
      managementReducer(
        {
          tabIndex: 2
        },
        resetTab()
      )
    ).toEqual({
      tabIndex: 0
    });
  });
});
