import { formatDateTime, formatTime, extractUsernameFromEmail, isNotEmpty } from '../utils/formatters';

describe('Formatters', () => {
  test('formatDateTime should format date correctly', () => {
    const date = '2023-12-25T15:30:00Z';
    const result = formatDateTime(date);
    expect(result).toMatch(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/);
  });

  test('formatTime should format time correctly', () => {
    const date = '2023-12-25T15:30:00Z';
    const result = formatTime(date);
    expect(result).toMatch(/^\d{1,2}:\d{2}$/);
  });

  test('extractUsernameFromEmail should extract username correctly', () => {
    const email = 'john.doe@example.com';
    const result = extractUsernameFromEmail(email);
    expect(result).toBe('john.doe');
  });

  test('isNotEmpty should validate strings correctly', () => {
    expect(isNotEmpty('hello')).toBe(true);
    expect(isNotEmpty('')).toBe(false);
    expect(isNotEmpty(null)).toBe(false);
    expect(isNotEmpty(undefined)).toBe(false);
  });
});