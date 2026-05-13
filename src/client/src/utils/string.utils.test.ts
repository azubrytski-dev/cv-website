import { calculateDuration } from './string.utils';

describe('calculateDuration', () => {
  afterEach(() => {
    jest.useRealTimers();
  });

  it('formats a multi-year duration', () => {
    expect(calculateDuration('2020-01-01', '2023-03-01')).toBe('3 years and 2 months');
  });

  it('formats present as the current date', () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2024-03-01T00:00:00Z'));

    expect(calculateDuration('2022-01-01', 'present')).toBe('2 years and 2 months');
  });

  it('parses month-year strings used by the experience data', () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2024-05-01T00:00:00Z'));

    expect(calculateDuration('August 2021', 'April 2024')).toBe('2 years and 8 months');
  });
});
