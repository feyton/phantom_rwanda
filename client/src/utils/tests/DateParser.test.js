import DateParser from '../DateParser.js';

describe('DATE PARSER', () => {
  it('Return formatted date', () => {
    const inputDate =
      'Date Tue May 10 2022 20:36:42';
    const date = DateParser(inputDate);
    const formattedDate = '10 May 2022, 20:36:42';
    expect(date).toBe(formattedDate);
  });
});
