/**
 * View Manager
 *
 * Manages all application views and handles view switching.
 */

const DashboardView = require('./DashboardView');
const DataView = require('./DataView');
const SettingsView = require('./SettingsView');
const HelpView = require('./HelpView');

/**
 * View Manager Class
 */
class ViewManager {
  constructor(app, styleManager) {
    this.app = app;
    this.styleManager = styleManager;

    // Initialize all views
    this.views = {
      dashboard: new DashboardView(app, styleManager),
      data: new DataView(app, styleManager),
      settings: new SettingsView(app, styleManager),
      help: new HelpView(app, styleManager)
    };

    this.currentView = null;
  }

  /**
   * Render a specific view
   * @param {string} viewName - Name of the view to render
   */
  renderView(viewName) {
    // Clear current view if it exists
    if (this.currentView && this.currentView !== viewName) {
      this.clearCurrentView();
    }

    // Get the view
    const view = this.views[viewName];
    if (!view) {
      // eslint-disable-next-line no-console
      console.error(`View '${viewName}' not found`);
      return;
    }

    // Set current view
    this.currentView = viewName;

    // Render the view
    view.render();
  }

  /**
   * Clear the current view
   */
  clearCurrentView() {
    if (this.currentView && this.views[this.currentView]) {
      this.views[this.currentView].clear();
    }
  }

  /**
   * Get a specific view
   * @param {string} viewName - Name of the view
   * @returns {Object} View instance
   */
  getView(viewName) {
    return this.views[viewName];
  }

  /**
   * Get the current view name
   * @returns {string} Current view name
   */
  getCurrentViewName() {
    return this.currentView;
  }

  /**
   * Get all available views
   * @returns {Array} Array of view names
   */
  getAvailableViews() {
    return Object.keys(this.views);
  }

  /**
   * Check if a view exists
   * @param {string} viewName - View name to check
   * @returns {boolean} True if view exists
   */
  hasView(viewName) {
    return Object.prototype.hasOwnProperty.call(this.views, viewName);
  }

  /**
   * Update all views with new state
   * @param {Object} state - Application state
   */
  updateViews(state) {
    Object.values(this.views).forEach(view => {
      if (view.update) {
        view.update(state);
      }
    });
  }

  /**
   * Clear all views
   */
  clearAllViews() {
    Object.values(this.views).forEach(view => {
      view.clear();
    });
    this.currentView = null;
  }

  /**
   * Destroy all views
   */
  destroy() {
    Object.values(this.views).forEach(view => {
      if (view.destroy) {
        view.destroy();
      }
    });
    this.views = {};
    this.currentView = null;
  }
}

module.exports = ViewManager;
