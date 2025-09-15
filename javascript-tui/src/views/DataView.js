/**
 * Data View
 *
 * Displays tabular data and data management interface.
 */

const BaseView = require('./BaseView');

/**
 * Data View Class
 */
class DataView extends BaseView {
  constructor(app, styleManager) {
    super(app, styleManager);
    this.data = this.generateSampleData();
    this.sortColumn = null;
    this.sortDirection = 'asc';
  }

  /**
   * Get the title of the view
   * @returns {string} View title
   */
  getTitle() {
    return 'Data Browser';
  }

  /**
   * Get the description of the view
   * @returns {string} View description
   */
  getDescription() {
    return 'Browse and manage data';
  }

  /**
   * Generate sample data
   * @returns {Array} Sample data array
   */
  generateSampleData() {
    return [
      { id: '001', name: 'Project Alpha', status: 'Active', value: '$1,234', priority: 'High' },
      { id: '002', name: 'Project Beta', status: 'Pending', value: '$5,678', priority: 'Medium' },
      { id: '003', name: 'Project Gamma', status: 'Completed', value: '$9,012', priority: 'Low' },
      { id: '004', name: 'Project Delta', status: 'Active', value: '$3,456', priority: 'High' },
      { id: '005', name: 'Project Epsilon', status: 'Cancelled', value: '$0', priority: 'Low' },
      { id: '006', name: 'Project Zeta', status: 'Active', value: '$7,890', priority: 'Medium' },
      { id: '007', name: 'Project Eta', status: 'Pending', value: '$2,345', priority: 'High' },
      { id: '008', name: 'Project Theta', status: 'Completed', value: '$6,789', priority: 'Low' }
    ];
  }

  /**
   * Render the view
   */
  render() {
    const content = this.getDataContent();
    this.setContent(content);
  }

  /**
   * Get the data content
   * @returns {string} Data content
   */
  getDataContent() {
    let content = '';

    // Title
    content += '{center}{bold}{blue-fg}📁 Data Browser{/blue-fg}{/bold}{/center}\n\n';

    // Data table
    content += '{bold}Sample Data Table:{/bold}\n\n';

    // Table header
    content += this.formatTableRow(['ID', 'Name', 'Status', 'Value', 'Priority'], true);
    content += this.formatTableSeparator();

    // Table rows
    this.data.forEach(row => {
      content += this.formatTableRow([
        row.id,
        row.name,
        row.status,
        row.value,
        row.priority
      ], false, row.status);
    });

    content += '\n';

    // Statistics
    content += '{bold}Statistics:{/bold}\n';
    const stats = this.calculateStats();
    content += `• Total Projects: ${stats.total}\n`;
    content += `• Active: ${stats.active}\n`;
    content += `• Pending: ${stats.pending}\n`;
    content += `• Completed: ${stats.completed}\n`;
    content += `• Cancelled: ${stats.cancelled}\n`;
    content += `• Total Value: ${stats.totalValue}\n\n`;

    // Instructions
    content += '{bold}Instructions:{/bold}\n';
    content += '• Use arrow keys to navigate (coming soon)\n';
    content += '• Press {green-fg}s{/green-fg} to sort by status\n';
    content += '• Press {green-fg}n{/green-fg} to sort by name\n';
    content += '• Press {green-fg}v{/green-fg} to sort by value\n';
    content += '• Press {green-fg}r{/green-fg} to refresh data\n';

    return content;
  }

  /**
   * Format a table row
   * @param {Array} columns - Column values
   * @param {boolean} isHeader - Whether this is a header row
   * @param {string} status - Status for color coding
   * @returns {string} Formatted row
   */
  formatTableRow(columns, isHeader = false, status = null) {
    const widths = [8, 20, 12, 10, 10];
    let row = '';

    columns.forEach((column, index) => {
      const width = widths[index];
      let formattedColumn = column.toString().padEnd(width).substring(0, width);

      if (isHeader) {
        formattedColumn = `{bold}${formattedColumn}{/bold}`;
      } else if (status) {
        formattedColumn = this.colorizeByStatus(formattedColumn, status);
      }

      row += formattedColumn + ' | ';
    });

    return row.substring(0, row.length - 3) + '\n';
  }

  /**
   * Format table separator
   * @returns {string} Table separator
   */
  formatTableSeparator() {
    return '--------|----------------------|------------|----------|----------\n';
  }

  /**
   * Colorize text based on status
   * @param {string} text - Text to colorize
   * @param {string} status - Status value
   * @returns {string} Colorized text
   */
  colorizeByStatus(text, status) {
    switch (status) {
      case 'Active':
      case 'Completed':
        return `{green-fg}${text}{/green-fg}`;
      case 'Pending':
        return `{yellow-fg}${text}{/yellow-fg}`;
      case 'Cancelled':
        return `{red-fg}${text}{/red-fg}`;
      default:
        return text;
    }
  }

  /**
   * Calculate statistics
   * @returns {Object} Statistics object
   */
  calculateStats() {
    const stats = {
      total: this.data.length,
      active: 0,
      pending: 0,
      completed: 0,
      cancelled: 0,
      totalValue: 0
    };

    this.data.forEach(row => {
      switch (row.status) {
        case 'Active':
          stats.active++;
          break;
        case 'Pending':
          stats.pending++;
          break;
        case 'Completed':
          stats.completed++;
          break;
        case 'Cancelled':
          stats.cancelled++;
          break;
      }

      // Parse value (remove $ and commas)
      const value = parseInt(row.value.replace(/[$,]/g, ''));
      if (!isNaN(value)) {
        stats.totalValue += value;
      }
    });

    stats.totalValue = `$${stats.totalValue.toLocaleString()}`;

    return stats;
  }

  /**
   * Sort data by column
   * @param {string} column - Column to sort by
   */
  sortBy(column) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    this.data.sort((a, b) => {
      let aVal = a[column];
      let bVal = b[column];

      // Handle numeric values
      if (column === 'value') {
        aVal = parseInt(aVal.replace(/[$,]/g, ''));
        bVal = parseInt(bVal.replace(/[$,]/g, ''));
      }

      if (this.sortDirection === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });

    this.render();
    this.showNotification(`Sorted by ${column} (${this.sortDirection})`, 'info');
  }

  /**
   * Handle key events
   * @param {string} key - Key pressed
   * @returns {boolean} True if key was handled
   */
  handleKey(key) {
    switch (key) {
      case 's':
        this.sortBy('status');
        return true;
      case 'n':
        this.sortBy('name');
        return true;
      case 'v':
        this.sortBy('value');
        return true;
      case 'r':
        this.data = this.generateSampleData();
        this.render();
        this.showNotification('Data refreshed', 'success');
        return true;
      default:
        return false;
    }
  }
}

module.exports = DataView;
