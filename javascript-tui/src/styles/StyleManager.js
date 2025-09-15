/**
 * Style Manager
 *
 * Manages themes, colors, and styling for the application.
 * Provides a centralized way to handle styling across all components.
 */

/**
 * Light theme colors
 */
const LIGHT_THEME = {
  background: '#FFFFFF',
  foreground: '#000000',
  primary: '#007ACC',
  secondary: '#6C757D',
  success: '#28A745',
  warning: '#FFC107',
  error: '#DC3545',
  muted: '#6C757D',
  border: '#DEE2E6'
};

/**
 * Dark theme colors
 */
const DARK_THEME = {
  background: '#1E1E1E',
  foreground: '#FFFFFF',
  primary: '#007ACC',
  secondary: '#6C757D',
  success: '#28A745',
  warning: '#FFC107',
  error: '#DC3545',
  muted: '#6C757D',
  border: '#495057'
};

/**
 * Style Manager Class
 */
class StyleManager {
  constructor() {
    this.currentTheme = 'light';
    this.themes = {
      light: LIGHT_THEME,
      dark: DARK_THEME
    };
  }

  /**
   * Get the current theme
   * @returns {string} Current theme name
   */
  getCurrentTheme() {
    return this.currentTheme;
  }

  /**
   * Set the current theme
   * @param {string} themeName - Name of the theme to set
   */
  setTheme(themeName) {
    if (this.themes[themeName]) {
      this.currentTheme = themeName;
    }
  }

  /**
   * Toggle between light and dark themes
   */
  toggleTheme() {
    this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
  }

  /**
   * Get the current theme colors
   * @returns {Object} Current theme colors
   */
  getCurrentThemeColors() {
    return this.themes[this.currentTheme];
  }

  /**
   * Get style for a specific style type
   * @param {string} styleType - Type of style to get
   * @returns {Object} Style object for blessed
   */
  getStyle(styleType) {
    const theme = this.getCurrentThemeColors();
    return this.getStyleForType(styleType, theme);
  }

  /**
   * Get style for a specific type and theme
   * @param {string} styleType - Type of style to get
   * @param {Object} theme - Theme colors to use
   * @returns {Object} Style object for blessed
   */
  getStyleForType(styleType, theme) {
    switch (styleType) {
      case 'header':
        return {
          fg: theme.foreground,
          bg: theme.primary,
          bold: true
        };
      case 'sidebar':
        return {
          fg: theme.foreground,
          bg: theme.secondary
        };
      case 'content':
        return {
          fg: theme.foreground,
          bg: theme.background
        };
      case 'statusBar':
        return {
          fg: theme.secondary,
          bg: theme.background
        };
      case 'button':
        return {
          fg: theme.foreground,
          bg: theme.primary
        };
      case 'buttonActive':
        return {
          fg: theme.background,
          bg: theme.primary,
          bold: true
        };
      case 'error':
        return {
          fg: theme.error,
          bold: true
        };
      case 'success':
        return {
          fg: theme.success,
          bold: true
        };
      case 'warning':
        return {
          fg: theme.warning,
          bold: true
        };
      case 'muted':
        return {
          fg: theme.muted
        };
      case 'border':
        return {
          border: {
            fg: theme.border
          }
        };
      case 'title':
        return {
          fg: theme.primary,
          bold: true
        };
      case 'subtitle':
        return {
          fg: theme.secondary,
          bold: true
        };
      case 'text':
        return {
          fg: theme.foreground
        };
      case 'info':
        return {
          fg: theme.primary
        };
      default:
        return {
          fg: theme.foreground,
          bg: theme.background
        };
    }
  }

  /**
   * Get a span with specific styling
   * @param {string} text - Text content
   * @param {string} styleType - Style type to apply
   * @returns {Object} Styled span object
   */
  getSpan(text, styleType) {
    const style = this.getStyle(styleType);
    return {
      content: text,
      style: style
    };
  }

  /**
   * Get border style
   * @returns {Object} Border style object
   */
  getBorderStyle() {
    return {
      type: 'line',
      style: this.getStyle('border')
    };
  }

  /**
   * Get all available themes
   * @returns {Array} Array of theme names
   */
  getAvailableThemes() {
    return Object.keys(this.themes);
  }

  /**
   * Check if a theme exists
   * @param {string} themeName - Theme name to check
   * @returns {boolean} True if theme exists
   */
  hasTheme(themeName) {
    return Object.prototype.hasOwnProperty.call(this.themes, themeName);
  }
}

module.exports = StyleManager;
