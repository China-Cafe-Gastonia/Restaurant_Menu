/**
 * Error Handling and Logging Utilities
 */

/**
 * Log an error with context
 * @param {string} message - Error message
 * @param {Object} context - Additional context (error object, user action, etc.)
 */
export function logError(message, context = {}) {
  const timestamp = new Date().toISOString();
  
  console.error(`[${timestamp}] ${message}`, context);
  
  // Optional: Send to external logging service
  // sendToLoggingService({ timestamp, message, context });
}

/**
 * Log a warning with context
 * @param {string} message - Warning message
 * @param {Object} context - Additional context
 */
export function logWarning(message, context = {}) {
  const timestamp = new Date().toISOString();
  console.warn(`[${timestamp}] ${message}`, context);
}

/**
 * Log info message
 * @param {string} message - Info message
 * @param {Object} context - Additional context
 */
export function logInfo(message, context = {}) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${message}`, context);
}

/**
 * Show a user-friendly notification
 * @param {string} message - Message to display
 * @param {'success'|'error'|'warning'|'info'} type - Notification type
 * @param {number} duration - How long to show (milliseconds), 0 for persistent
 */
export function showNotification(message, type = 'info', duration = 5000) {
  // This is a simple implementation - you can enhance with a toast library
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  
  // Styles (inline for now, move to CSS later)
  Object.assign(notification.style, {
    position: 'fixed',
    top: '20px',
    right: '20px',
    padding: '1rem 1.5rem',
    borderRadius: '0.5rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    zIndex: '9999',
    maxWidth: '400px',
    animation: 'slideInRight 0.3s ease-out',
    backgroundColor: getNotificationColor(type),
    color: 'white',
    fontWeight: '600'
  });
  
  document.body.appendChild(notification);
  
  if (duration > 0) {
    setTimeout(() => {
      notification.style.animation = 'slideOutRight 0.3s ease-out';
      setTimeout(() => notification.remove(), 300);
    }, duration);
  }
  
  return notification;
}

/**
 * Get background color for notification type
 * @param {string} type - Notification type
 * @returns {string} CSS color
 */
function getNotificationColor(type) {
  const colors = {
    success: '#10b981', // green-500
    error: '#ef4444',   // red-500
    warning: '#f59e0b', // amber-500
    info: '#3b82f6'     // blue-500
  };
  return colors[type] || colors.info;
}

/**
 * Global error handler setup
 * Call this once when app initializes
 */
export function setupGlobalErrorHandlers() {
  // Handle unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    event.preventDefault();
    logError('Unhandled Promise Rejection', {
      reason: event.reason,
      promise: event.promise
    });
    showNotification(
      'An unexpected error occurred. Please try again.',
      'error'
    );
  });
  
  // Handle uncaught errors
  window.addEventListener('error', (event) => {
    logError('Uncaught Error', {
      message: event.message,
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
      error: event.error
    });
  });
  
  logInfo('Global error handlers initialized');
}

/**
 * Wrap async function with error handling
 * @param {Function} fn - Async function to wrap
 * @param {string} errorMessage - User-friendly error message
 * @returns {Function} Wrapped function
 */
export function withErrorHandling(fn, errorMessage = 'An error occurred') {
  return async (...args) => {
    try {
      return await fn(...args);
    } catch (error) {
      logError(errorMessage, { error, args });
      showNotification(errorMessage, 'error');
      throw error;
    }
  };
}
