/**
 * Validate email address
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate phone number
 * @param {string} phone - Phone to validate
 * @returns {boolean} True if valid
 */
export const isValidPhone = (phone) => {
  const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/;
  return phoneRegex.test(phone);
};

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @param {number} minLength - Minimum length (default: 6)
 * @returns {boolean} True if valid
 */
export const isValidPassword = (password, minLength = 6) => {
  return password.length >= minLength;
};

/**
 * Validate required field
 * @param {string} value - Value to validate
 * @returns {boolean} True if not empty
 */
export const isRequired = (value) => {
  return value !== null && value !== undefined && value.toString().trim() !== "";
};

