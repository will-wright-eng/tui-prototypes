/**
 * Status Bar Widget
 *
 * Displays status information and notifications at the bottom of the screen.
 */

/**
 * Status Bar Widget Class
 */
class StatusBarWidget {
  constructor(screen, styleManager) {
    this.screen = screen;
    this.styleManager = styleManager;
    this.element = null;
    this.status = '';
    this.notification = null;
    this.notificationTimeout = null;
  }

  /**
   * Create the status bar element
   */
  createElement() {
    if (this.element) {
      this.element.detach();
    }

    const blessed = require('blessed');
    this.element = blessed.box({
      parent: this.screen,
      top: '100%-1',
      left: 0,
      width: '100%',
      height: 1,
      content: this.getStatusContent(),
      style: this.styleManager.getStyle('statusBar'),
      tags: true
    });
  }

  /**
   * Get the status bar content
   * @returns {string} Status bar content
   */
  getStatusContent() {
    let content = this.status;

    if (this.notification) {
      const notificationStyle = this.getNotificationStyle(this.notification.type);
      content = `{${notificationStyle}}${this.notification.message}{/} | ${this.status}`;
    }

    return content;
  }

  /**
   * Get notification style based on type
   * @param {string} type - Notification type
   * @returns {string} Style string
   */
  getNotificationStyle(type) {
    switch (type) {
      case 'success':
        return 'green';
      case 'warning':
        return 'yellow';
      case 'error':
        return 'red';
      case 'info':
      default:
        return 'blue';
    }
  }

  /**
   * Update widget dimensions
   * @param {number} left - Left position
   * @param {number} top - Top position
   * @param {number} width - Width
   * @param {number} height - Height
   */
  updateDimensions(left, top, width, height) {
    if (this.element) {
      this.element.left = left;
      this.element.top = top;
      this.element.width = width;
      this.element.height = height;
    }
  }

  /**
   * Set the status message
   * @param {string} status - Status message
   */
  setStatus(status) {
    this.status = status;
    if (this.element) {
      this.element.setContent(this.getStatusContent());
    }
  }

  /**
   * Show a notification
   * @param {string} message - Notification message
   * @param {string} type - Notification type (info, success, warning, error)
   * @param {number} duration - Duration in milliseconds (default: 3000)
   */
  showNotification(message, type = 'info', duration = 3000) {
    // Clear existing notification timeout
    if (this.notificationTimeout) {
      clearTimeout(this.notificationTimeout);
    }

    // Set new notification
    this.notification = { message, type };

    if (this.element) {
      this.element.setContent(this.getStatusContent());
    }

    // Auto-clear notification after duration
    this.notificationTimeout = setTimeout(() => {
      this.clearNotification();
    }, duration);
  }

  /**
   * Clear the current notification
   */
  clearNotification() {
    this.notification = null;
    if (this.notificationTimeout) {
      clearTimeout(this.notificationTimeout);
      this.notificationTimeout = null;
    }

    if (this.element) {
      this.element.setContent(this.getStatusContent());
    }
  }

  /**
   * Render the widget
   */
  render() {
    this.createElement();
    this.screen.append(this.element);
  }

  /**
   * Get the current status
   * @returns {string} Current status
   */
  getStatus() {
    return this.status;
  }

  /**
   * Get the current notification
   * @returns {Object|null} Current notification
   */
  getNotification() {
    return this.notification;
  }

  /**
   * Clear the widget
   */
  clear() {
    if (this.element) {
      this.element.detach();
    }
    this.clearNotification();
  }

  /**
   * Destroy the widget
   */
  destroy() {
    this.clear();
    this.element = null;
  }
}

module.exports = StatusBarWidget;
