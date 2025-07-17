/**
 * Utility functions for common operations
 */

/**
 * Formats a date string to a readable format
 * @param dateString - The date string to format
 * @returns Formatted date string in YYYY-MM-DD HH:MM format
 */
export const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}`;
};

/**
 * Formats a date string to time only format
 * @param dateString - The date string to format
 * @returns Formatted time string in HH:MM format
 */
export const formatTime = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

/**
 * Extracts username from email address
 * @param email - The email address
 * @returns Username part of the email (part before @)
 */
export const extractUsernameFromEmail = (email: string): string => {
  return email.split('@')[0];
};

/**
 * Validates if a string is not null or empty
 * @param value - The string to validate
 * @returns True if the string is not null/undefined/empty
 */
export const isNotEmpty = (value: string | null | undefined): boolean => {
  return value != null && value !== '';
};