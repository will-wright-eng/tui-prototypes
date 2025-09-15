/**
 * Base View Class
 *
 * Provides common functionality for all views.
 */

/**
 * Base View Class
 */
class BaseView {
  constructor(app, styleManager) {
    this.app = app;
    this.styleManager = styleManager;
    this.widgets = [];
  }

  /**
   * Get the title of the view
   * @returns {string} View title
   */
  getTitle() {
    return 'Base View';
  }

  /**
   * Get the description of the view
   * @returns {string} View description
   */
  getDescription() {
    return 'Base view description';
  }

  /**
   * Render the view
   */
  render() {
    // Override in subclasses
  }

  /**
   * Update the view with new state
   * @param {Object} state - Application state
   */
  update(state) {
    // Override in subclasses
    // eslint-disable-next-line no-unused-vars
    const _ = state;
  }

  /**
   * Handle key events
   * @param {string} key - Key pressed
   * @returns {boolean} True if key was handled
   */
  handleKey(key) {
    // Override in subclasses
    // eslint-disable-next-line no-unused-vars
    const _ = key;
    return false;
  }

  /**
   * Clear the view
   */
  clear() {
    this.widgets.forEach(widget => {
      if (widget.clear) {
        widget.clear();
      }
    });
    this.widgets = [];
  }

  /**
   * Destroy the view
   */
  destroy() {
    this.clear();
  }

  /**
   * Add a widget to the view
   * @param {Object} widget - Widget to add
   */
  addWidget(widget) {
    this.widgets.push(widget);
  }

  /**
   * Remove a widget from the view
   * @param {Object} widget - Widget to remove
   */
  removeWidget(widget) {
    const index = this.widgets.indexOf(widget);
    if (index > -1) {
      this.widgets.splice(index, 1);
    }
  }

  /**
   * Get the content widget from the app
   * @returns {Object} Content widget
   */
  getContentWidget() {
    return this.app.widgetManager.getWidget('content');
  }

  /**
   * Set content in the content widget
   * @param {string} content - Content to set
   */
  setContent(content) {
    const contentWidget = this.getContentWidget();
    if (contentWidget) {
      contentWidget.setContent(content);
    }
  }

  /**
   * Show a notification
   * @param {string} message - Notification message
   * @param {string} type - Notification type
   */
  showNotification(message, type = 'info') {
    this.app.widgetManager.showNotification(message, type);
  }
}

module.exports = BaseView;
