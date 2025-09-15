/**
 * Event Handler
 *
 * Handles keyboard and mouse events for the application.
 */

/**
 * Event Handler Class
 */
class EventHandler {
  constructor(app) {
    this.app = app;
    this.setupKeyboardHandlers();
    this.setupMouseHandlers();
  }

  /**
   * Setup keyboard event handlers
   */
  setupKeyboardHandlers() {
    const screen = this.app.getScreen();

    // Global keyboard shortcuts
    screen.key(['q', 'C-c'], () => {
      this.app.quit();
    });

    // View navigation
    screen.key(['1'], () => {
      this.app.switchView('dashboard');
    });

    screen.key(['2'], () => {
      this.app.switchView('data');
    });

    screen.key(['3'], () => {
      this.app.switchView('settings');
    });

    screen.key(['4'], () => {
      this.app.switchView('help');
    });

    // Theme toggle
    screen.key(['t'], () => {
      this.app.toggleTheme();
    });

    // Handle view-specific keys
    screen.key(['r'], () => {
      this.handleViewSpecificKey('r');
    });

    screen.key(['s'], () => {
      this.handleViewSpecificKey('s');
    });

    screen.key(['n'], () => {
      this.handleViewSpecificKey('n');
    });

    screen.key(['v'], () => {
      this.handleViewSpecificKey('v');
    });

    screen.key(['e'], () => {
      this.handleViewSpecificKey('e');
    });

    screen.key(['i'], () => {
      this.handleViewSpecificKey('i');
    });

    screen.key(['b'], () => {
      this.handleViewSpecificKey('b');
    });

    screen.key(['d'], () => {
      this.handleViewSpecificKey('d');
    });

    screen.key(['h'], () => {
      this.handleViewSpecificKey('h');
    });

    // Handle escape key
    screen.key(['escape'], () => {
      this.handleEscape();
    });

    // Handle tab key
    screen.key(['tab'], () => {
      this.handleTab();
    });

    // Handle enter key
    screen.key(['enter'], () => {
      this.handleEnter();
    });

    // Handle arrow keys
    screen.key(['up'], () => {
      this.handleArrowKey('up');
    });

    screen.key(['down'], () => {
      this.handleArrowKey('down');
    });

    screen.key(['left'], () => {
      this.handleArrowKey('left');
    });

    screen.key(['right'], () => {
      this.handleArrowKey('right');
    });
  }

  /**
   * Setup mouse event handlers
   */
  setupMouseHandlers() {
    const screen = this.app.getScreen();

    // Handle mouse clicks
    screen.on('click', (data) => {
      this.handleMouseClick(data);
    });

    // Handle mouse wheel
    screen.on('wheelup', () => {
      this.handleMouseWheel('up');
    });

    screen.on('wheeldown', () => {
      this.handleMouseWheel('down');
    });
  }

  /**
   * Handle view-specific key presses
   * @param {string} key - Key pressed
   */
  handleViewSpecificKey(key) {
    const currentViewName = this.app.viewManager.getCurrentViewName();
    const currentView = this.app.viewManager.getView(currentViewName);

    if (currentView && currentView.handleKey) {
      const handled = currentView.handleKey(key);
      if (handled) {
        // Key was handled by the view
        return;
      }
    }

    // Key was not handled by the view, show a message
    this.app.widgetManager.showNotification(`Key '${key}' not available in ${currentViewName} view`, 'warning');
  }

  /**
   * Handle escape key
   */
  handleEscape() {
    // In a real application, this might close modals or go back
    this.app.widgetManager.showNotification('Escape key pressed', 'info');
  }

  /**
   * Handle tab key
   */
  handleTab() {
    // In a real application, this would cycle through focusable elements
    this.app.widgetManager.showNotification('Tab navigation coming soon', 'info');
  }

  /**
   * Handle enter key
   */
  handleEnter() {
    // In a real application, this would activate focused elements
    this.app.widgetManager.showNotification('Enter key pressed', 'info');
  }

  /**
   * Handle arrow keys
   * @param {string} direction - Arrow direction
   */
  handleArrowKey(direction) {
    // In a real application, this would navigate within views
    this.app.widgetManager.showNotification(`Arrow ${direction} pressed`, 'info');
  }

  /**
   * Handle mouse clicks
   * @param {Object} data - Mouse click data
   */
  handleMouseClick(data) {
    // In a real application, this would handle mouse interactions
    this.app.widgetManager.showNotification(`Mouse clicked at (${data.x}, ${data.y})`, 'info');
  }

  /**
   * Handle mouse wheel
   * @param {string} direction - Wheel direction
   */
  handleMouseWheel(direction) {
    // In a real application, this would scroll content
    this.app.widgetManager.showNotification(`Mouse wheel ${direction}`, 'info');
  }

  /**
   * Add a custom key handler
   * @param {string|Array} keys - Key(s) to handle
   * @param {Function} handler - Handler function
   */
  addKeyHandler(keys, handler) {
    const screen = this.app.getScreen();
    screen.key(keys, handler);
  }

  /**
   * Remove a key handler
   * @param {string|Array} keys - Key(s) to remove
   */
  removeKeyHandler(keys) {
    const screen = this.app.getScreen();
    screen.unkey(keys);
  }

  /**
   * Get all registered key handlers
   * @returns {Object} Key handlers
   */
  getKeyHandlers() {
    const screen = this.app.getScreen();
    return screen._listeners || {};
  }
}

module.exports = EventHandler;
