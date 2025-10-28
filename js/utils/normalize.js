/**
 * Data Normalization Utilities
 * Handles flattening of nested unit arrays and menu item normalization
 */

/**
 * Flatten nested unit arrays into array of objects {size, option, price}
 * 
 * Converts various unit formats into a consistent structure:
 * - [size, price] → [{size, option: null, price}]
 * - [size, [[option, price], ...]] → [{size, option, price}, ...]
 * 
 * @param {Array|any} unit - The unit array to flatten
 * @returns {Array|any} Flattened array of unit objects or original value if not array
 * 
 * @example
 * flattenUnitField([["Small", 5.99], ["Large", 7.99]])
 * // Returns: [{size: "Small", option: null, price: 5.99}, {size: "Large", option: null, price: 7.99}]
 * 
 * @example
 * flattenUnitField([["Small", [["Chicken", 5.99], ["Beef", 6.99]]]])
 * // Returns: [{size: "Small", option: "Chicken", price: 5.99}, {size: "Small", option: "Beef", price: 6.99}]
 */
export function flattenUnitField(unit) {
  // Return non-arrays as-is
  if (!Array.isArray(unit)) {
    return unit;
  }

  // Check if already flattened (contains objects with size/price keys)
  if (unit.length > 0 && typeof unit[0] === 'object' && 
      (unit[0].size !== undefined || unit[0].price !== undefined)) {
    return unit;
  }

  const flattened = [];

  for (const entry of unit) {
    // Handle scalar entries (non-array items)
    if (!Array.isArray(entry)) {
      flattened.push({
        size: entry,
        option: null,
        price: null
      });
      continue;
    }

    // Extract size and second element
    const [size, second] = entry;

    // Check if second element is an array of options
    if (Array.isArray(second)) {
      // Process each option
      for (const opt of second) {
        if (Array.isArray(opt) && opt.length >= 2) {
          // [option, price] format
          flattened.push({
            size: size,
            option: opt[0],
            price: opt[1]
          });
        } else {
          // Option without price
          flattened.push({
            size: size,
            option: opt,
            price: null
          });
        }
      }
    } else {
      // Second element is a scalar price
      flattened.push({
        size: size,
        option: null,
        price: second
      });
    }
  }

  return flattened;
}

/**
 * Normalize a single menu item
 * Ensures the item has consistent structure, particularly for the unit field
 * 
 * @param {Object|any} item - Menu item to normalize
 * @returns {Object|any} Normalized menu item or original value if not object
 * 
 * @example
 * normalizeMenuItem({
 *   name: "Fried Rice",
 *   unit: [["Small", 5.99], ["Large", 7.99]]
 * })
 * // Returns: {
 * //   name: "Fried Rice",
 * //   unit: [{size: "Small", option: null, price: 5.99}, ...]
 * // }
 */
export function normalizeMenuItem(item) {
  // Return non-objects as-is
  if (!item || typeof item !== 'object') {
    return item;
  }

  // Create shallow copy to avoid mutating original
  const normalized = { ...item };

  // Flatten unit field if present
  if (normalized.unit) {
    try {
      normalized.unit = flattenUnitField(normalized.unit);
    } catch (error) {
      console.warn('Failed to flatten unit for item:', item, error);
      // Keep original unit on error
    }
  }

  return normalized;
}

/**
 * Normalize an entire menu document
 * Handles various menu structures (nested categories, flat lists, etc.)
 * 
 * @param {Object|Array} doc - Menu document to normalize
 * @returns {Object|Array} Normalized menu document
 * 
 * @example
 * normalizeWholeDoc({
 *   menu: [{
 *     category: "Appetizers",
 *     items: [{ name: "Spring Roll", unit: [...] }]
 *   }]
 * })
 */
export function normalizeWholeDoc(doc) {
  if (!doc) return doc;

  // Deep copy to avoid mutations
  const normalized = JSON.parse(JSON.stringify(doc));

  // Handle nested menu structure with categories
  if (Array.isArray(normalized.menu)) {
    for (const category of normalized.menu) {
      if (Array.isArray(category.items)) {
        category.items = category.items.map(normalizeMenuItem);
      }
    }
    return normalized;
  }

  // Handle flat array of items
  if (Array.isArray(normalized)) {
    return normalized.map(normalizeMenuItem);
  }

  // Handle menuData property
  if (Array.isArray(normalized.menuData)) {
    normalized.menuData = normalized.menuData.map(normalizeMenuItem);
    return normalized;
  }

  // Fallback: try to normalize any array of item-like objects
  for (const [key, value] of Object.entries(normalized)) {
    if (Array.isArray(value) && value.length > 0 && 
        typeof value[0] === 'object' && 'name' in value[0]) {
      normalized[key] = value.map(normalizeMenuItem);
    }
  }

  return normalized;
}

/**
 * Check if normalization should be skipped (based on localStorage setting)
 * @returns {boolean} True if normalization should be skipped
 */
export function shouldSkipNormalization() {
  try {
    return localStorage.getItem('skipNormalization') === '1';
  } catch (error) {
    console.warn('Failed to read skipNormalization setting:', error);
    return false;
  }
}
