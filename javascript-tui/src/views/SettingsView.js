/**
 * Settings View
 *
 * Displays application settings and configuration options.
 */

const BaseView = require('./BaseView');

/**
 * Settings View Class
 */
class SettingsView extends BaseView {
  constructor(app, styleManager) {
    super(app, styleManager);
    this.settings = {
      theme: 'light',
      showBorders: true,
      showStatusBar: true,
      showNavigation: true,
      compactMode: false,
      autoSave: true,
      notifications: true,
      debugMode: false,
      logLevel: 'info'
    };
  }

  /**
   * Get the title of the view
   * @returns {string} View title
   */
  getTitle() {
    return 'Settings';
  }

  /**
   * Get the description of the view
   * @returns {string} View description
   */
  getDescription() {
    return 'Application configuration';
  }

  /**
   * Render the view
   */
  render() {
    const content = this.getSettingsContent();
    this.setContent(content);
  }

  /**
   * Get the settings content
   * @returns {string} Settings content
   */
  getSettingsContent() {
    let content = '';

    // Title
    content += '{center}{bold}{blue-fg}⚙️ Settings{/blue-fg}{/bold}{/center}\n\n';

    // Theme settings
    content += '{bold}Theme Settings:{/bold}\n';
    content += `• Current Theme: ${this.settings.theme} ${this.settings.theme === 'light' ? '☀️' : '🌙'}\n`;
    content += '• Available Themes: Light, Dark\n';
    content += '• Press {green-fg}t{/green-fg} to toggle theme\n\n';

    // Display settings
    content += '{bold}Display Settings:{/bold}\n';
    content += `• Show borders: ${this.formatBoolean(this.settings.showBorders)}\n`;
    content += `• Show status bar: ${this.formatBoolean(this.settings.showStatusBar)}\n`;
    content += `• Show navigation: ${this.formatBoolean(this.settings.showNavigation)}\n`;
    content += `• Compact mode: ${this.formatBoolean(this.settings.compactMode)}\n\n`;

    // Application settings
    content += '{bold}Application Settings:{/bold}\n';
    content += `• Auto-save: ${this.formatBoolean(this.settings.autoSave)}\n`;
    content += `• Notifications: ${this.formatBoolean(this.settings.notifications)}\n`;
    content += `• Debug mode: ${this.formatBoolean(this.settings.debugMode)}\n`;
    content += `• Log level: ${this.settings.logLevel}\n\n`;

    // Keyboard shortcuts
    content += '{bold}Keyboard Shortcuts:{/bold}\n';
    content += '• {green-fg}1-4{/green-fg} - Navigate views\n';
    content += '• {green-fg}q{/green-fg} - Quit application\n';
    content += '• {green-fg}Ctrl+C{/green-fg} - Force quit\n';
    content += '• {green-fg}t{/green-fg} - Toggle theme\n';
    content += '• {green-fg}Tab{/green-fg} - Focus next element (coming soon)\n';
    content += '• {green-fg}Enter{/green-fg} - Activate/Confirm (coming soon)\n\n';

    // System information
    content += '{bold}System Information:{/bold}\n';
    content += `• Node.js Version: ${process.version}\n`;
    content += `• Platform: ${process.platform}\n`;
    content += `• Architecture: ${process.arch}\n`;
    content += `• Memory Usage: ${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)} MB\n`;
    content += `• Uptime: ${Math.round(process.uptime())} seconds\n\n`;

    // Configuration file info
    content += '{bold}Configuration:{/bold}\n';
    content += '• Configuration file: config.json (coming soon)\n';
    content += '• Auto-save settings: Enabled\n';
    content += '• Export settings: Available (coming soon)\n';
    content += '• Import settings: Available (coming soon)\n\n';

    // Instructions
    content += '{bold}Instructions:{/bold}\n';
    content += '• Press {green-fg}r{/green-fg} to reset to defaults\n';
    content += '• Press {green-fg}s{/green-fg} to save settings\n';
    content += '• Press {green-fg}e{/green-fg} to export settings\n';
    content += '• Press {green-fg}i{/green-fg} to import settings\n';

    return content;
  }

  /**
   * Format boolean value for display
   * @param {boolean} value - Boolean value
   * @returns {string} Formatted boolean
   */
  formatBoolean(value) {
    return value ? '{green-fg}Enabled{/green-fg}' : '{red-fg}Disabled{/red-fg}';
  }

  /**
   * Toggle a boolean setting
   * @param {string} setting - Setting name
   */
  toggleSetting(setting) {
    if (Object.prototype.hasOwnProperty.call(this.settings, setting) && typeof this.settings[setting] === 'boolean') {
      this.settings[setting] = !this.settings[setting];
      this.render();
      this.showNotification(`${setting} ${this.settings[setting] ? 'enabled' : 'disabled'}`, 'info');
    }
  }

  /**
   * Reset settings to defaults
   */
  resetToDefaults() {
    this.settings = {
      theme: 'light',
      showBorders: true,
      showStatusBar: true,
      showNavigation: true,
      compactMode: false,
      autoSave: true,
      notifications: true,
      debugMode: false,
      logLevel: 'info'
    };
    this.render();
    this.showNotification('Settings reset to defaults', 'success');
  }

  /**
   * Save settings
   */
  saveSettings() {
    // In a real application, this would save to a file
    this.showNotification('Settings saved', 'success');
  }

  /**
   * Export settings
   */
  exportSettings() {
    // In a real application, this would export to a file
    this.showNotification('Settings exported', 'info');
  }

  /**
   * Import settings
   */
  importSettings() {
    // In a real application, this would import from a file
    this.showNotification('Settings imported', 'info');
  }

  /**
   * Handle key events
   * @param {string} key - Key pressed
   * @returns {boolean} True if key was handled
   */
  handleKey(key) {
    switch (key) {
      case 'r':
        this.resetToDefaults();
        return true;
      case 's':
        this.saveSettings();
        return true;
      case 'e':
        this.exportSettings();
        return true;
      case 'i':
        this.importSettings();
        return true;
      case 'b':
        this.toggleSetting('showBorders');
        return true;
      case 'n':
        this.toggleSetting('notifications');
        return true;
      case 'd':
        this.toggleSetting('debugMode');
        return true;
      default:
        return false;
    }
  }
}

module.exports = SettingsView;
