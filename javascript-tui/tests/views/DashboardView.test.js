/**
 * Dashboard View Tests
 *
 * Tests for the dashboard view.
 */

const DashboardView = require('../../src/views/DashboardView');

// Mock app and style manager
const mockApp = {
  widgetManager: {
    getWidget: jest.fn(() => ({
      setContent: jest.fn()
    })),
    showNotification: jest.fn()
  }
};

const mockStyleManager = {
  getCurrentTheme: jest.fn(() => 'light')
};

describe('DashboardView', () => {
  let dashboardView;

  beforeEach(() => {
    dashboardView = new DashboardView(mockApp, mockStyleManager);
  });

  afterEach(() => {
    dashboardView = null;
  });

  test('should create a dashboard view instance', () => {
    expect(dashboardView).toBeDefined();
    expect(dashboardView.getTitle()).toBe('Dashboard');
    expect(dashboardView.getDescription()).toBe('Overview and quick actions');
  });

  test('should get dashboard content', () => {
    const content = dashboardView.getDashboardContent();
    expect(content).toBeDefined();
    expect(content).toContain('Dashboard');
    expect(content).toContain('Welcome to the JavaScript TUI Prototype');
    expect(content).toContain('Features:');
    expect(content).toContain('Quick Stats:');
  });

  test('should handle key events', () => {
    // Test refresh key
    const result = dashboardView.handleKey('r');
    expect(result).toBe(true);
    expect(mockApp.widgetManager.showNotification).toHaveBeenCalledWith('Dashboard refreshed', 'success');

    // Test unknown key
    const unknownResult = dashboardView.handleKey('x');
    expect(unknownResult).toBe(false);
  });

  test('should update with new state', () => {
    const state = { theme: 'dark' };
    dashboardView.lastTheme = 'light';

    dashboardView.update(state);

    expect(mockStyleManager.getCurrentTheme).toHaveBeenCalled();
  });
});
