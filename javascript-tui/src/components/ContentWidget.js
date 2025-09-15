/**
 * Content Widget
 *
 * Displays the main content area for different views.
 */

/**
 * Content Widget Class
 */
class ContentWidget {
  constructor(screen, styleManager) {
    this.screen = screen;
    this.styleManager = styleManager;
    this.element = null;
    this.content = '';
  }

  /**
   * Create the content element
   */
  createElement() {
    if (this.element) {
      this.element.detach();
    }

    const blessed = require('blessed');
    this.element = blessed.box({
      parent: this.screen,
      top: 3,
      left: 20,
      width: '100%-20',
      height: '100%-4',
      content: this.content,
      style: this.styleManager.getStyle('content'),
      border: this.styleManager.getBorderStyle(),
      tags: true,
      scrollable: true,
      alwaysScroll: true,
      scrollbar: {
        ch: ' ',
        track: {
          bg: this.styleManager.getStyle('muted').fg
        },
        style: {
          inverse: true
        }
      }
    });
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
   * Set the content
   * @param {string} content - Content to display
   */
  setContent(content) {
    this.content = content;
    if (this.element) {
      this.element.setContent(content);
    }
  }

  /**
   * Append content to existing content
   * @param {string} content - Content to append
   */
  appendContent(content) {
    this.content += content;
    if (this.element) {
      this.element.setContent(this.content);
    }
  }

  /**
   * Clear the content
   */
  clearContent() {
    this.content = '';
    if (this.element) {
      this.element.setContent('');
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
   * Get the current content
   * @returns {string} Current content
   */
  getContent() {
    return this.content;
  }

  /**
   * Scroll to top
   */
  scrollToTop() {
    if (this.element) {
      this.element.scrollTo(0);
    }
  }

  /**
   * Scroll to bottom
   */
  scrollToBottom() {
    if (this.element) {
      this.element.scrollTo(this.element.getScrollHeight());
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

module.exports = ContentWidget;
