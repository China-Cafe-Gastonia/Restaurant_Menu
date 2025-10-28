/**
 * Formatting Utilities
 * Price and time formatting functions
 */

/**
 * Format a price value with currency symbol
 * 
 * @param {number|string|null} value - Price value to format
 * @returns {string} Formatted price string (e.g., "$5.99") or empty string
 * 
 * @example
 * formatPrice(5.99)    // Returns: "$5.99"
 * formatPrice("5.99")  // Returns: "$5.99"
 * formatPrice(null)    // Returns: ""
 * formatPrice("")      // Returns: ""
 */
export function formatPrice(value) {
  if (value === null || value === undefined || value === '') {
    return '';
  }

  const numericValue = Number(value);
  
  if (Number.isFinite(numericValue)) {
    return `$${numericValue.toFixed(2)}`;
  }

  return '';
}

/**
 * Convert 24-hour time format to 12-hour format with am/pm
 * 
 * @param {string} timeString - Time in HH:MM format (24-hour)
 * @returns {string} Time in 12-hour format with am/pm
 * 
 * @example
 * to12Hour("13:30")  // Returns: "1:30 pm"
 * to12Hour("09:00")  // Returns: "9:00 am"
 * to12Hour("00:00")  // Returns: "12:00 am"
 */
export function to12Hour(timeString) {
  if (!timeString) return '';
  
  const trimmed = String(timeString).trim();
  const match = trimmed.match(/^(\d{1,2}):(\d{2})$/);
  
  if (!match) return trimmed; // Return as-is if format doesn't match
  
  let hours = parseInt(match[1], 10);
  const minutes = match[2];
  
  const period = hours >= 12 ? 'pm' : 'am';
  
  // Convert to 12-hour format
  hours = hours % 12;
  if (hours === 0) hours = 12;
  
  return `${hours}:${minutes} ${period}`;
}

/**
 * Format a time string by converting any HH:MM tokens to 12-hour format
 * Only converts times not already followed by am/pm
 * 
 * @param {string} text - Text containing time strings
 * @returns {string} Text with times converted to 12-hour format
 * 
 * @example
 * formatTimeString("Open 13:30 - 22:00")
 * // Returns: "Open 1:30 pm - 10:00 pm"
 */
export function formatTimeString(text) {
  if (text === null || text === undefined) {
    return text;
  }

  // Replace HH:MM patterns that aren't followed by am/pm
  return String(text).replace(
    /(\d{1,2}:\d{2})(?!\s*(?:am|pm))/gi,
    (match) => to12Hour(match)
  );
}

/**
 * Normalize ingredient name to Title Case
 * 
 * @param {string} name - Ingredient name to normalize
 * @returns {string} Title-cased ingredient name
 * 
 * @example
 * normalizeIngredientName("water chestnut")  // Returns: "Water Chestnut"
 * normalizeIngredientName("BEEF")            // Returns: "Beef"
 */
export function normalizeIngredientName(name) {
  if (!name) return '';
  
  return String(name)
    .trim()
    .split(/\s+/)
    .map(word => {
      if (word.length === 0) return word;
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(' ');
}

/**
 * Normalize ingredient token for comparison (lowercase, trimmed)
 * 
 * @param {string} ingredient - Ingredient string to normalize
 * @returns {string} Normalized ingredient token
 * 
 * @example
 * normalizeIngredientToken("Water Chestnut")  // Returns: "water chestnut"
 * normalizeIngredientToken("  Beef  ")        // Returns: "beef"
 */
export function normalizeIngredientToken(ingredient) {
  return String(ingredient || '').trim().toLowerCase();
}
