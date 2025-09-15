/**
 * Help View
 *
 * Displays help documentation and keyboard shortcuts.
 */

const BaseView = require('./BaseView');

/**
 * Help View Class
 */
class HelpView extends BaseView {
  constructor(app, styleManager) {
    super(app, styleManager);
  }

  /**
   * Get the title of the view
   * @returns {string} View title
   */
  getTitle() {
    return 'Help';
  }

  /**
   * Get the description of the view
   * @returns {string} View description
   */
  getDescription() {
    return 'Documentation and help';
  }

  /**
   * Render the view
   */
  render() {
    const content = this.getHelpContent();
    this.setContent(content);
  }

  /**
   * Get the help content
   * @returns {string} Help content
   */
  getHelpContent() {
    let content = '';

    // Title
    content += '{center}{bold}{blue-fg}❓ Help & Documentation{/blue-fg}{/bold}{/center}\n\n';

    // About section
    content += '{bold}About JavaScript TUI:{/bold}\n';
    content += 'This is a prototype Terminal User Interface built with JavaScript and Blessed.\n';
    content += 'It demonstrates modern TUI patterns and best practices.\n\n';

    // Navigation help
    content += '{bold}Navigation:{/bold}\n';
    content += '{green-fg}1{/green-fg} - Dashboard: Overview and quick actions\n';
    content += '{green-fg}2{/green-fg} - Data Browser: View and manage data\n';
    content += '{green-fg}3{/green-fg} - Settings: Configure application\n';
    content += '{green-fg}4{/green-fg} - Help: This documentation\n\n';

    // Keyboard shortcuts
    content += '{bold}Keyboard Shortcuts:{/bold}\n';
    content += '{red-fg}q{/red-fg} or {red-fg}Ctrl+C{/red-fg} - Quit application\n';
    content += '{green-fg}1-4{/green-fg} - Switch between views\n';
    content += '{yellow-fg}t{/yellow-fg} - Toggle theme (light/dark)\n';
    content += '{green-fg}Tab{/green-fg} - Focus next element (coming soon)\n';
    content += '{green-fg}Enter{/green-fg} - Activate/Confirm (coming soon)\n';
    content += '{green-fg}Escape{/green-fg} - Cancel/Go back (coming soon)\n\n';

    // View-specific shortcuts
    content += '{bold}View-Specific Shortcuts:{/bold}\n';
    content += '{bold}Dashboard:{/bold}\n';
    content += '  {green-fg}r{/green-fg} - Refresh dashboard\n\n';
    content += '{bold}Data Browser:{/bold}\n';
    content += '  {green-fg}s{/green-fg} - Sort by status\n';
    content += '  {green-fg}n{/green-fg} - Sort by name\n';
    content += '  {green-fg}v{/green-fg} - Sort by value\n';
    content += '  {green-fg}r{/green-fg} - Refresh data\n\n';
    content += '{bold}Settings:{/bold}\n';
    content += '  {green-fg}r{/green-fg} - Reset to defaults\n';
    content += '  {green-fg}s{/green-fg} - Save settings\n';
    content += '  {green-fg}e{/green-fg} - Export settings\n';
    content += '  {green-fg}i{/green-fg} - Import settings\n';
    content += '  {green-fg}b{/green-fg} - Toggle borders\n';
    content += '  {green-fg}n{/green-fg} - Toggle notifications\n';
    content += '  {green-fg}d{/green-fg} - Toggle debug mode\n\n';

    // Features
    content += '{bold}Features:{/bold}\n';
    content += '• Responsive design that adapts to terminal size\n';
    content += '• Modern styling with light and dark themes\n';
    content += '• Full keyboard navigation\n';
    content += '• Multiple views with different functionality\n';
    content += '• Component-based architecture\n';
    content += '• Real-time data updates\n';
    content += '• Status notifications\n';
    content += '• Scrollable content areas\n\n';

    // Tips
    content += '{bold}Tips:{/bold}\n';
    content += '• Resize your terminal window to see responsive design\n';
    content += '• Use number keys for quick navigation between views\n';
    content += '• Check the status bar for current view information\n';
    content += '• Press {yellow-fg}t{/yellow-fg} to switch between light and dark themes\n';
    content += '• Use view-specific shortcuts for enhanced functionality\n\n';

    // Troubleshooting
    content += '{bold}Troubleshooting:{/bold}\n';
    content += '• If the interface appears broken, try resizing your terminal\n';
    content += '• Make sure your terminal supports ANSI colors\n';
    content += '• For best experience, use a terminal with at least 80x24 characters\n';
    content += '• If keys don\'t work, make sure the application has focus\n\n';

    // Technology stack
    content += '{bold}Technology Stack:{/bold}\n';
    content += '• Node.js - JavaScript runtime\n';
    content += '• Blessed - TUI framework\n';
    content += '• Blessed-Contrib - Additional widgets\n';
    content += '• Chalk - Terminal styling\n';
    content += '• Jest - Testing framework\n\n';

    // Version info
    content += '{bold}Version Information:{/bold}\n';
    content += '• Application Version: 1.0.0\n';
    content += `• Node.js Version: ${process.version}\n`;
    content += `• Platform: ${process.platform}\n`;
    content += `• Architecture: ${process.arch}\n`;

    return content;
  }

  /**
   * Handle key events
   * @param {string} key - Key pressed
   * @returns {boolean} True if key was handled
   */
  handleKey(key) {
    switch (key) {
      case 'h':
        // Show help about help (meta-help)
        this.showNotification('You are already in the help view!', 'info');
        return true;
      default:
        return false;
    }
  }
}

module.exports = HelpView;
