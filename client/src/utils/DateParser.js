export const DateParser = (date) => {
  const time = new Date(date);
  const formatted = `${time.toLocaleString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })}`;
  return formatted;
};

export default DateParser;
