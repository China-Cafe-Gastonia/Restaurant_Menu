/**
 * UI Helper Utilities
 * Common UI operations like button loading states, confirmations, etc.
 */

/**
 * Set button to loading state
 * @param {HTMLButtonElement} button - Button element
 * @param {boolean} isLoading - Whether button should show loading state
 * @param {string} loadingText - Optional text to show while loading
 */
export function setButtonLoading(button, isLoading, loadingText = 'Loading...') {
  if (!button) return;
  
  if (isLoading) {
    // Store original content
    button.dataset.originalContent = button.innerHTML;
    button.disabled = true;
    
    // Add spinner and loading text
    button.innerHTML = `
      <span class="spinner"></span>
      <span class="ml-2">${loadingText}</span>
    `;
    button.classList.add('opacity-75', 'cursor-not-allowed');
  } else {
    // Restore original content
    button.disabled = false;
    button.innerHTML = button.dataset.originalContent || button.innerHTML;
    button.classList.remove('opacity-75', 'cursor-not-allowed');
    delete button.dataset.originalContent;
  }
}

/**
 * Show confirmation dialog with custom message
 * @param {string} message - Confirmation message
 * @param {string} confirmText - Text for confirm button (default: 'Confirm')
 * @returns {Promise<boolean>} True if confirmed, false otherwise
 */
export async function confirmDialog(message, confirmText = 'Confirm') {
  return new Promise((resolve) => {
    const confirmed = window.confirm(message);
    resolve(confirmed);
  });
}

/**
 * Disable element temporarily
 * @param {HTMLElement} element - Element to disable
 * @param {number} duration - How long to disable (milliseconds)
 */
export function temporaryDisable(element, duration = 1000) {
  if (!element) return;
  
  element.disabled = true;
  element.classList.add('opacity-50', 'cursor-not-allowed');
  
  setTimeout(() => {
    element.disabled = false;
    element.classList.remove('opacity-50', 'cursor-not-allowed');
  }, duration);
}

/**
 * Scroll element into view smoothly
 * @param {HTMLElement|string} elementOrSelector - Element or CSS selector
 * @param {Object} options - Scroll options
 */
export function scrollToElement(elementOrSelector, options = {}) {
  const element = typeof elementOrSelector === 'string' 
    ? document.querySelector(elementOrSelector)
    : elementOrSelector;
  
  if (!element) return;
  
  element.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
    ...options
  });
}

/**
 * Copy text to clipboard
 * @param {string} text - Text to copy
 * @returns {Promise<boolean>} Success status
 */
export async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.select();
    
    try {
      document.execCommand('copy');
      document.body.removeChild(textArea);
      return true;
    } catch (err) {
      document.body.removeChild(textArea);
      return false;
    }
  }
}

/**
 * Debounce function calls
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export function debounce(func, wait = 300) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Format file size for display
 * @param {number} bytes - File size in bytes
 * @returns {string} Formatted size string
 */
export function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid email format
 */
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Get query parameter from URL
 * @param {string} param - Parameter name
 * @returns {string|null} Parameter value or null
 */
export function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

/**
 * Set query parameter in URL without reload
 * @param {string} param - Parameter name
 * @param {string} value - Parameter value
 */
export function setQueryParam(param, value) {
  const url = new URL(window.location);
  url.searchParams.set(param, value);
  window.history.pushState({}, '', url);
}
