import {
  counterReducer,
  increment,
  decrement,
  reset
} from '../counterReducer.js';

describe('Counter reducer Tests', () => {
  it('Should display a Default Value', () => {
    expect(counterReducer(undefined, {})).toEqual({ value: 0 });
  });

  it('should increment state by one', () => {
    expect(counterReducer({ value: 1 }, increment)).toEqual({
      value: 2
    });
  });

  it('should decrement state by one', () => {
    expect(counterReducer({ value: 1 }, decrement)).toEqual({
      value: 0
    });
  });

  it('should reset the counter to 0', () => {
    expect(counterReducer({ value: 1 }, reset)).toEqual({
      value: 0
    });
  });
});
