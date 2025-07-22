// Utility functions for the portfolio website

// DOM Utilities
const DOM = {
  /**
   * Query selector with error handling
   * @param {string} selector - CSS selector
   * @param {Element} context - Context element (default: document)
   * @returns {Element|null}
   */
  $(selector, context = document) {
    try {
      return context.querySelector(selector);
    } catch (error) {
      console.warn(`Invalid selector: ${selector}`, error);
      return null;
    }
  },

  /**
   * Query all with error handling
   * @param {string} selector - CSS selector
   * @param {Element} context - Context element (default: document)
   * @returns {NodeList}
   */
  $$(selector, context = document) {
    try {
      return context.querySelectorAll(selector);
    } catch (error) {
      console.warn(`Invalid selector: ${selector}`, error);
      return [];
    }
  },

  /**
   * Add event listener with error handling
   * @param {Element} element - DOM element
   * @param {string} event - Event type
   * @param {Function} handler - Event handler
   * @param {Object} options - Event options
   */
  on(element, event, handler, options = {}) {
    if (element && typeof handler === "function") {
      element.addEventListener(event, handler, options);
    }
  },

  /**
   * Remove event listener
   * @param {Element} element - DOM element
   * @param {string} event - Event type
   * @param {Function} handler - Event handler
   */
  off(element, event, handler) {
    if (element && typeof handler === "function") {
      element.removeEventListener(event, handler);
    }
  },

  /**
   * Toggle class on element
   * @param {Element} element - DOM element
   * @param {string} className - Class name to toggle
   * @returns {boolean} - Whether class is now present
   */
  toggleClass(element, className) {
    if (element && className) {
      return element.classList.toggle(className);
    }
    return false;
  },

  /**
   * Check if element has class
   * @param {Element} element - DOM element
   * @param {string} className - Class name to check
   * @returns {boolean}
   */
  hasClass(element, className) {
    return element ? element.classList.contains(className) : false;
  },
};

// Storage Utilities
const Storage = {
  /**
   * Get item from localStorage with error handling
   * @param {string} key - Storage key
   * @param {*} defaultValue - Default value if key doesn't exist
   * @returns {*}
   */
  get(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.warn(`Error reading from localStorage: ${key}`, error);
      return defaultValue;
    }
  },

  /**
   * Set item in localStorage with error handling
   * @param {string} key - Storage key
   * @param {*} value - Value to store
   * @returns {boolean} - Success status
   */
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.warn(`Error writing to localStorage: ${key}`, error);
      return false;
    }
  },

  /**
   * Remove item from localStorage
   * @param {string} key - Storage key
   */
  remove(key) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.warn(`Error removing from localStorage: ${key}`, error);
    }
  },

  /**
   * Clear all localStorage
   */
  clear() {
    try {
      localStorage.clear();
    } catch (error) {
      console.warn("Error clearing localStorage", error);
    }
  },
};

// Animation Utilities
const Animation = {
  /**
   * Animate element with CSS transitions
   * @param {Element} element - DOM element
   * @param {Object} properties - CSS properties to animate
   * @param {number} duration - Animation duration in ms
   * @returns {Promise}
   */
  animate(element, properties, duration = 300) {
    return new Promise((resolve) => {
      if (!element) {
        resolve();
        return;
      }

      const originalTransition = element.style.transition;
      element.style.transition = `all ${duration}ms ease`;

      Object.assign(element.style, properties);

      setTimeout(() => {
        element.style.transition = originalTransition;
        resolve();
      }, duration);
    });
  },

  /**
   * Fade in element
   * @param {Element} element - DOM element
   * @param {number} duration - Animation duration in ms
   * @returns {Promise}
   */
  fadeIn(element, duration = 300) {
    if (!element) return Promise.resolve();

    element.style.opacity = "0";
    element.style.display = "block";

    return this.animate(element, { opacity: "1" }, duration);
  },

  /**
   * Fade out element
   * @param {Element} element - DOM element
   * @param {number} duration - Animation duration in ms
   * @returns {Promise}
   */
  fadeOut(element, duration = 300) {
    if (!element) return Promise.resolve();

    return this.animate(element, { opacity: "0" }, duration).then(() => {
      element.style.display = "none";
    });
  },

  /**
   * Slide down element
   * @param {Element} element - DOM element
   * @param {number} duration - Animation duration in ms
   * @returns {Promise}
   */
  slideDown(element, duration = 300) {
    if (!element) return Promise.resolve();

    element.style.height = "0";
    element.style.overflow = "hidden";
    element.style.display = "block";

    const height = element.scrollHeight + "px";

    return this.animate(element, { height }, duration).then(() => {
      element.style.height = "";
      element.style.overflow = "";
    });
  },

  /**
   * Slide up element
   * @param {Element} element - DOM element
   * @param {number} duration - Animation duration in ms
   * @returns {Promise}
   */
  slideUp(element, duration = 300) {
    if (!element) return Promise.resolve();

    element.style.height = element.scrollHeight + "px";
    element.style.overflow = "hidden";

    return this.animate(element, { height: "0" }, duration).then(() => {
      element.style.display = "none";
      element.style.height = "";
      element.style.overflow = "";
    });
  },
};

// Debounce and Throttle Utilities
const Performance = {
  /**
   * Debounce function execution
   * @param {Function} func - Function to debounce
   * @param {number} wait - Wait time in ms
   * @param {boolean} immediate - Execute immediately
   * @returns {Function}
   */
  debounce(func, wait, immediate = false) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        timeout = null;
        if (!immediate) func.apply(this, args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(this, args);
    };
  },

  /**
   * Throttle function execution
   * @param {Function} func - Function to throttle
   * @param {number} limit - Time limit in ms
   * @returns {Function}
   */
  throttle(func, limit) {
    let inThrottle;
    return function executedFunction(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  },

  /**
   * Request animation frame with fallback
   * @param {Function} callback - Callback function
   * @returns {number} - Request ID
   */
  raf(callback) {
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      function (callback) {
        return window.setTimeout(callback, 1000 / 60);
      }
    )(callback);
  },
};

// Validation Utilities
const Validate = {
  /**
   * Validate email address
   * @param {string} email - Email to validate
   * @returns {boolean}
   */
  email(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  /**
   * Validate URL
   * @param {string} url - URL to validate
   * @returns {boolean}
   */
  url(url) {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  },

  /**
   * Check if value is not empty
   * @param {*} value - Value to check
   * @returns {boolean}
   */
  required(value) {
    return value !== null && value !== undefined && value !== "";
  },

  /**
   * Validate minimum length
   * @param {string} value - String to validate
   * @param {number} min - Minimum length
   * @returns {boolean}
   */
  minLength(value, min) {
    return typeof value === "string" && value.length >= min;
  },
};

// Device Detection
const Device = {
  /**
   * Check if device is mobile
   * @returns {boolean}
   */
  isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  },

  /**
   * Check if device is tablet
   * @returns {boolean}
   */
  isTablet() {
    return /iPad|Android(?=.*\bMobile\b)(?=.*\bSafari\b)/i.test(
      navigator.userAgent
    );
  },

  /**
   * Check if device is desktop
   * @returns {boolean}
   */
  isDesktop() {
    return !this.isMobile() && !this.isTablet();
  },

  /**
   * Get viewport dimensions
   * @returns {Object}
   */
  getViewport() {
    return {
      width: Math.max(
        document.documentElement.clientWidth || 0,
        window.innerWidth || 0
      ),
      height: Math.max(
        document.documentElement.clientHeight || 0,
        window.innerHeight || 0
      ),
    };
  },
};

// Error Handling
const ErrorHandler = {
  /**
   * Handle and log errors
   * @param {Error} error - Error object
   * @param {string} context - Error context
   */
  handle(error, context = "Unknown") {
    console.error(`Error in ${context}:`, error);

    // You can extend this to send errors to a logging service
    if (window.gtag) {
      window.gtag("event", "exception", {
        description: error.message,
        fatal: false,
      });
    }
  },

  /**
   * Wrap function with error handling
   * @param {Function} func - Function to wrap
   * @param {string} context - Error context
   * @returns {Function}
   */
  wrap(func, context) {
    return (...args) => {
      try {
        return func.apply(this, args);
      } catch (error) {
        this.handle(error, context);
      }
    };
  },
};

// Export utilities
if (typeof window !== "undefined") {
  window.Utils = {
    DOM,
    Storage,
    Animation,
    Performance,
    Validate,
    Device,
    ErrorHandler,
  };
}

// Export for Node.js environment
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    DOM,
    Storage,
    Animation,
    Performance,
    Validate,
    Device,
    ErrorHandler,
  };
}
