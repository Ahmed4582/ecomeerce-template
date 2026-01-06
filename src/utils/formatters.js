/**
 * Format price with currency symbol
 * @param {number} price - The price to format
 * @param {string} currency - Currency code (USD, EUR, etc.)
 * @returns {string} Formatted price string
 */
export const formatPrice = (price, currency = "USD") => {
  const currencySymbols = {
    USD: "$",
    EUR: "€",
    GBP: "£",
    SAR: "ر.س",
    AED: "د.إ",
    EGP: "ج.م",
  };

  const symbol = currencySymbols[currency] || "$";
  return `${price.toFixed(2)}${symbol}`;
};

/**
 * Format date to readable string
 * @param {string|Date} date - Date to format
 * @param {string} locale - Locale code (en, ar)
 * @returns {string} Formatted date string
 */
export const formatDate = (date, locale = "en") => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat(locale === "ar" ? "ar-SA" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(dateObj);
};

/**
 * Truncate text to specified length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
export const truncateText = (text, maxLength = 100) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
};

/**
 * Calculate discount percentage
 * @param {number} originalPrice - Original price
 * @param {number} currentPrice - Current price
 * @returns {number} Discount percentage
 */
export const calculateDiscount = (originalPrice, currentPrice) => {
  if (originalPrice <= 0) return 0;
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
};

