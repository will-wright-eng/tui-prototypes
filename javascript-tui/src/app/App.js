/**
 * Main Application Class
 *
 * Manages the overall application state, coordinates components,
 * and handles the main application loop.
 */

const blessed = require('blessed');
const StyleManager = require('../styles/StyleManager');
const WidgetManager = require('../components/WidgetManager');
const ViewManager = require('../views/ViewManager');
const EventHandler = require('../utils/EventHandler');

/**
 * Application state management
 */
class AppState {
  constructor() {
    this.currentView = 'dashboard';
    this.width = 80;
    this.height = 24;
    this.shouldQuit = false;
    this.theme = 'light';
    this.config = {};
  }

  /**
   * Update state with new values
   * @param {Object} newState - New state values
   */
  update(newState) {
    Object.assign(this, newState);
  }
}

/**
 * Main Application Class
 */
class App {
  constructor() {
    this.state = new AppState();
    this.screen = null;
    this.styleManager = null;
    this.widgetManager = null;
    this.viewManager = null;
    this.eventHandler = null;

    this.initialize();
  }

  /**
   * Initialize the application
   */
  initialize() {
    // Create the blessed screen
    this.screen = blessed.screen({
      smartCSR: true,
      title: 'JavaScript TUI Prototype',
      fullUnicode: true,
      dockBorders: true,
      autoPadding: true
    });

    // Initialize managers
    this.styleManager = new StyleManager();
    this.widgetManager = new WidgetManager(this.screen, this.styleManager);
    this.viewManager = new ViewManager(this, this.styleManager);
    this.eventHandler = new EventHandler(this);

    // Setup event handlers
    this.setupEventHandlers();

    // Initial render
    this.render();
  }

  /**
   * Setup event handlers
   */
  setupEventHandlers() {
    // Handle screen resize
    this.screen.on('resize', () => {
      this.state.update({
        width: this.screen.width,
        height: this.screen.height
      });
      this.render();
    });

    // Handle quit
    this.screen.key(['q', 'C-c'], () => {
      this.quit();
    });

    // Handle view switching
    this.screen.key(['1'], () => {
      this.switchView('dashboard');
    });

    this.screen.key(['2'], () => {
      this.switchView('data');
    });

    this.screen.key(['3'], () => {
      this.switchView('settings');
    });

    this.screen.key(['4'], () => {
      this.switchView('help');
    });

    // Handle theme toggle
    this.screen.key(['t'], () => {
      this.toggleTheme();
    });
  }

  /**
   * Switch to a different view
   * @param {string} viewName - Name of the view to switch to
   */
  switchView(viewName) {
    if (this.state.currentView !== viewName) {
      this.state.update({ currentView: viewName });
      this.render();
    }
  }

  /**
   * Toggle between light and dark themes
   */
  toggleTheme() {
    const newTheme = this.state.theme === 'light' ? 'dark' : 'light';
    this.state.update({ theme: newTheme });
    this.styleManager.setTheme(newTheme);
    this.render();
  }

  /**
   * Clear all widgets from the screen
   */
  clearWidgets() {
    this.widgetManager.clear();
  }

  /**
   * Render the application
   */
  render() {
    // Clear existing widgets
    this.clearWidgets();

    // Update widget manager with current state
    this.widgetManager.updateState(this.state);

    // Render all widgets
    this.widgetManager.render();

    // Render the current view
    this.viewManager.renderView(this.state.currentView);

    // Render the screen
    this.screen.render();
  }

  /**
   * Run the application
   */
  run() {
    // eslint-disable-next-line no-console
    console.log('JavaScript TUI Prototype started successfully!');
    // eslint-disable-next-line no-console
    console.log('Press q to quit, 1-4 to navigate, t to toggle theme');

    // Initial render
    this.render();
  }

  /**
   * Quit the application
   */
  quit() {
    this.state.update({ shouldQuit: true });

    // Show goodbye message
    blessed.box({
      parent: this.screen,
      top: 'center',
      left: 'center',
      width: 30,
      height: 5,
      content: 'Thanks for using JavaScript TUI! 👋',
      style: {
        fg: 'white',
        bg: 'blue',
        bold: true
      },
      border: {
        type: 'line'
      },
      align: 'center',
      valign: 'middle'
    });

    this.screen.render();

    // Exit after a short delay
    setTimeout(() => {
      process.exit(0);
    }, 1000);
  }

  /**
   * Get the current application state
   * @returns {AppState} Current state
   */
  getState() {
    return this.state;
  }

  /**
   * Get the blessed screen instance
   * @returns {Object} Blessed screen
   */
  getScreen() {
    return this.screen;
  }
}

module.exports = App;
