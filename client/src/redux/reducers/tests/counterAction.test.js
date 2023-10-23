import { increment, decrement, reset } from '../counterReducer.js';

describe('Action Tests', () => {
  it('should create an Increment Action', () => {
    const incrementAction = {
      type: 'increment/counter',
      payload: undefined
    };
    expect(increment()).toEqual(incrementAction);
  });

  it('should create a decrement Action', () => {
    const decrementAction = {
      type: 'decrement/counter',
      payload: undefined
    };
    expect(decrement()).toEqual(decrementAction);
  });

  it('Should create a reset Action', () => {
    const resetAction = {
      type: 'reset/counter',
      payload: undefined
    };
    expect(reset()).toEqual(resetAction);
  });
});
