/**
 * Widget Manager
 *
 * Manages all UI widgets and components.
 * Handles creation, positioning, and rendering of widgets.
 */

const HeaderWidget = require('./HeaderWidget');
const SidebarWidget = require('./SidebarWidget');
const ContentWidget = require('./ContentWidget');
const StatusBarWidget = require('./StatusBarWidget');

/**
 * Widget Manager Class
 */
class WidgetManager {
  constructor(screen, styleManager) {
    this.screen = screen;
    this.styleManager = styleManager;

    // Initialize widgets
    this.header = new HeaderWidget(screen, styleManager);
    this.sidebar = new SidebarWidget(screen, styleManager);
    this.content = new ContentWidget(screen, styleManager);
    this.statusBar = new StatusBarWidget(screen, styleManager);

    // Widget registry
    this.widgets = {
      header: this.header,
      sidebar: this.sidebar,
      content: this.content,
      statusBar: this.statusBar
    };
  }

  /**
   * Update all widgets with current state
   * @param {Object} state - Application state
   */
  updateState(state) {
    // Update sidebar with current view
    this.sidebar.setCurrentView(state.currentView);

    // Update status bar
    const statusText = `View: ${state.currentView} | Press 'q' to quit | 1-4 for navigation | 't' to toggle theme`;
    this.statusBar.setStatus(statusText);

    // Update all widgets with new dimensions
    this.updateDimensions(state.width, state.height);
  }

  /**
   * Update widget dimensions based on screen size
   * @param {number} width - Screen width
   * @param {number} height - Screen height
   */
  updateDimensions(width, height) {
    // Header: full width, 3 rows high
    this.header.updateDimensions(0, 0, width, 3);

    // Sidebar: 20 columns wide, from row 3 to height-1
    this.sidebar.updateDimensions(0, 3, 20, height - 4);

    // Content: remaining width, from row 3 to height-1
    this.content.updateDimensions(20, 3, width - 20, height - 4);

    // Status bar: full width, 1 row high, at bottom
    this.statusBar.updateDimensions(0, height - 1, width, 1);
  }

  /**
   * Render all widgets
   */
  render() {
    // Render all widgets in order
    Object.values(this.widgets).forEach(widget => {
      widget.render();
    });
  }

  /**
   * Get a specific widget
   * @param {string} widgetName - Name of the widget
   * @returns {Object} Widget instance
   */
  getWidget(widgetName) {
    return this.widgets[widgetName];
  }

  /**
   * Set content for the content widget
   * @param {string} content - Content to display
   */
  setContent(content) {
    this.content.setContent(content);
  }

  /**
   * Show a notification in the status bar
   * @param {string} message - Notification message
   * @param {string} type - Notification type (info, success, warning, error)
   */
  showNotification(message, type = 'info') {
    this.statusBar.showNotification(message, type);
  }

  /**
   * Clear all widgets from the screen
   */
  clear() {
    Object.values(this.widgets).forEach(widget => {
      widget.clear();
    });
  }

  /**
   * Destroy all widgets
   */
  destroy() {
    Object.values(this.widgets).forEach(widget => {
      widget.destroy();
    });
  }
}

module.exports = WidgetManager;
