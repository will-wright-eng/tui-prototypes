/**
 * Dashboard View
 *
 * Displays the main dashboard with overview and quick actions.
 */

const BaseView = require('./BaseView');

/**
 * Dashboard View Class
 */
class DashboardView extends BaseView {
  constructor(app, styleManager) {
    super(app, styleManager);
  }

  /**
   * Get the title of the view
   * @returns {string} View title
   */
  getTitle() {
    return 'Dashboard';
  }

  /**
   * Get the description of the view
   * @returns {string} View description
   */
  getDescription() {
    return 'Overview and quick actions';
  }

  /**
   * Render the view
   */
  render() {
    const content = this.getDashboardContent();
    this.setContent(content);
  }

  /**
   * Get the dashboard content
   * @returns {string} Dashboard content
   */
  getDashboardContent() {
    const theme = this.styleManager.getCurrentTheme();
    const themeIcon = theme === 'light' ? '☀️' : '🌙';

    let content = '';

    // Title
    content += '{center}{bold}{blue-fg}📊 Dashboard{/blue-fg}{/bold}{/center}\n\n';

    // Welcome message
    content += '{center}Welcome to the JavaScript TUI Prototype!{/center}\n\n';

    // Features overview
    content += '{bold}Features:{/bold}\n';
    content += '• Modern TUI interface\n';
    content += '• Responsive design\n';
    content += '• Keyboard navigation\n';
    content += '• Multiple views\n';
    content += '• Styled components\n';
    content += '• Theme support\n\n';

    // Quick stats
    content += '{bold}Quick Stats:{/bold}\n';
    content += '• Views: 4\n';
    content += '• Components: 4\n';
    content += '• Themes: 2\n';
    content += `• Current Theme: ${theme} ${themeIcon}\n\n`;

    // Getting started
    content += '{bold}Getting Started:{/bold}\n';
    content += 'Use the number keys (1-4) to navigate between views:\n';
    content += '{green-fg}1{/green-fg} - Dashboard (current)\n';
    content += '{green-fg}2{/green-fg} - Data Browser\n';
    content += '{green-fg}3{/green-fg} - Settings\n';
    content += '{green-fg}4{/green-fg} - Help\n\n';
    content += 'Press {red-fg}q{/red-fg} or {red-fg}Ctrl+C{/red-fg} to quit.\n';
    content += 'Press {yellow-fg}t{/yellow-fg} to toggle theme.\n\n';

    // System info
    content += '{bold}System Information:{/bold}\n';
    content += `• Node.js Version: ${process.version}\n`;
    content += `• Platform: ${process.platform}\n`;
    content += `• Architecture: ${process.arch}\n`;
    content += `• Memory Usage: ${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)} MB\n`;

    return content;
  }

  /**
   * Update the view with new state
   * @param {Object} state - Application state
   */
  update(state) {
    // Re-render if theme changed
    if (state.theme !== this.lastTheme) {
      this.lastTheme = state.theme;
      this.render();
    }
  }

  /**
   * Handle key events
   * @param {string} key - Key pressed
   * @returns {boolean} True if key was handled
   */
  handleKey(key) {
    switch (key) {
      case 'r':
        // Refresh dashboard
        this.render();
        this.showNotification('Dashboard refreshed', 'success');
        return true;
      default:
        return false;
    }
  }
}

module.exports = DashboardView;
