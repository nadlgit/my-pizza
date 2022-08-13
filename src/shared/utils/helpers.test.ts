import { formatPrice } from './helpers';

describe('formatPrice', () => {
  it.each([
    [0, '0,00€'],
    [0.7, '0,70€'],
    [19.386, '19,39€'],
    [5.412, '5,41€'],
  ])('should format %f', (value, expected) => {
    expect(formatPrice(value)).toBe(expected);
  });
});
