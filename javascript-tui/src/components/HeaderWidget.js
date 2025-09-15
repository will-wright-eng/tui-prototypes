/**
 * Header Widget
 *
 * Displays the application title and navigation information.
 */

/**
 * Header Widget Class
 */
class HeaderWidget {
  constructor(screen, styleManager) {
    this.screen = screen;
    this.styleManager = styleManager;
    this.element = null;
    this.title = 'JavaScript TUI Prototype';
  }

  /**
   * Create the header element
   */
  createElement() {
    if (this.element) {
      this.element.detach();
    }

    const blessed = require('blessed');
    this.element = blessed.box({
      parent: this.screen,
      top: 0,
      left: 0,
      width: '100%',
      height: 3,
      content: this.getHeaderContent(),
      style: this.styleManager.getStyle('header'),
      border: this.styleManager.getBorderStyle(),
      tags: true
    });
  }

  /**
   * Get the header content
   * @returns {string} Header content
   */
  getHeaderContent() {
    const theme = this.styleManager.getCurrentTheme();
    const themeIndicator = theme === 'light' ? '☀️' : '🌙';

    return `{center}${this.title}{/center}\n{center}Theme: ${theme} ${themeIndicator} | Press 't' to toggle{/center}`;
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
   * Render the widget
   */
  render() {
    this.createElement();
    this.screen.append(this.element);
  }

  /**
   * Update the title
   * @param {string} title - New title
   */
  setTitle(title) {
    this.title = title;
    if (this.element) {
      this.element.setContent(this.getHeaderContent());
    }
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

module.exports = HeaderWidget;
