/**
 * Input Sanitization Utilities
 * Protects against XSS attacks by escaping HTML entities
 */

/**
 * Escape HTML special characters to prevent XSS
 * 
 * @param {string|any} str - String to escape
 * @returns {string} Escaped string safe for innerHTML
 * 
 * @example
 * escapeHtml('<script>alert("xss")</script>')
 * // Returns: '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;'
 */
export function escapeHtml(str) {
  if (str === null || str === undefined) {
    return '';
  }
  
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Sanitize an object's string properties recursively
 * Useful for sanitizing entire menu items before display
 * 
 * @param {Object} obj - Object to sanitize
 * @returns {Object} New object with sanitized string values
 */
export function sanitizeObject(obj) {
  if (obj === null || obj === undefined) {
    return obj;
  }
  
  if (typeof obj === 'string') {
    return escapeHtml(obj);
  }
  
  if (Array.isArray(obj)) {
    return obj.map(item => sanitizeObject(item));
  }
  
  if (typeof obj === 'object') {
    const sanitized = {};
    for (const [key, value] of Object.entries(obj)) {
      sanitized[key] = sanitizeObject(value);
    }
    return sanitized;
  }
  
  return obj;
}

/**
 * Sanitize a value for use in an HTML attribute
 * 
 * @param {string|any} str - String to sanitize for attribute use
 * @returns {string} Sanitized string safe for HTML attributes
 */
export function escapeAttr(str) {
  if (str === null || str === undefined) {
    return '';
  }
  
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
