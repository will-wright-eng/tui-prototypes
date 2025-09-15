/**
 * Sidebar Widget
 *
 * Displays the navigation menu with view options.
 */

/**
 * Sidebar Widget Class
 */
class SidebarWidget {
  constructor(screen, styleManager) {
    this.screen = screen;
    this.styleManager = styleManager;
    this.element = null;
    this.currentView = 'dashboard';

    // Navigation items
    this.navItems = [
      { key: '1', name: 'Dashboard', view: 'dashboard', icon: '📊' },
      { key: '2', name: 'Data Browser', view: 'data', icon: '📁' },
      { key: '3', name: 'Settings', view: 'settings', icon: '⚙️' },
      { key: '4', name: 'Help', view: 'help', icon: '❓' }
    ];
  }

  /**
   * Create the sidebar element
   */
  createElement() {
    if (this.element) {
      this.element.detach();
    }

    const blessed = require('blessed');
    this.element = blessed.box({
      parent: this.screen,
      top: 3,
      left: 0,
      width: 20,
      height: '100%-4',
      content: this.getSidebarContent(),
      style: this.styleManager.getStyle('sidebar'),
      border: this.styleManager.getBorderStyle(),
      tags: true
    });
  }

  /**
   * Get the sidebar content
   * @returns {string} Sidebar content
   */
  getSidebarContent() {
    let content = '{center}{bold}Navigation{/bold}{/center}\n\n';

    this.navItems.forEach(item => {
      const isActive = item.view === this.currentView;
      const style = isActive ? '{bold}{inverse}' : '';
      const endStyle = isActive ? '{/inverse}{/bold}' : '';

      content += `${style}${item.key}. ${item.icon} ${item.name}${endStyle}\n`;
    });

    content += '\n{center}{bold}Shortcuts{/bold}{/center}\n';
    content += 'q - Quit\n';
    content += 't - Toggle theme\n';
    content += '1-4 - Navigate\n';

    return content;
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
   * Set the current view
   * @param {string} viewName - Name of the current view
   */
  setCurrentView(viewName) {
    this.currentView = viewName;
    if (this.element) {
      this.element.setContent(this.getSidebarContent());
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
   * Get navigation items
   * @returns {Array} Array of navigation items
   */
  getNavItems() {
    return this.navItems;
  }

  /**
   * Get the current view
   * @returns {string} Current view name
   */
  getCurrentView() {
    return this.currentView;
  }

  /**
   * Clear the widget
   */
  clear() {
    if (this.element) {
      this.element.detach();
    }
  }

  /**
   * Destroy the widget
   */
  destroy() {
    this.clear();
    this.element = null;
  }
}

module.exports = SidebarWidget;
