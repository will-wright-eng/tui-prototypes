/**
 * App Tests
 *
 * Tests for the main application class.
 */

const App = require('../src/app/App');

// Mock blessed
jest.mock('blessed', () => ({
  screen: jest.fn(() => ({
    on: jest.fn(),
    key: jest.fn(),
    clear: jest.fn(),
    render: jest.fn(),
    focus: jest.fn(),
    append: jest.fn(),
    box: jest.fn(() => ({
      detach: jest.fn(),
      setContent: jest.fn(),
      left: 0,
      top: 0,
      width: 80,
      height: 24
    }))
  })),
  box: jest.fn(() => ({
    detach: jest.fn(),
    setContent: jest.fn(),
    left: 0,
    top: 0,
    width: 80,
    height: 24
  }))
}));

describe('App', () => {
  let app;

  beforeEach(() => {
    app = new App();
  });

  afterEach(() => {
    if (app) {
      app = null;
    }
  });

  test('should create an app instance', () => {
    expect(app).toBeDefined();
    expect(app.state).toBeDefined();
    expect(app.screen).toBeDefined();
    expect(app.styleManager).toBeDefined();
    expect(app.widgetManager).toBeDefined();
    expect(app.viewManager).toBeDefined();
    expect(app.eventHandler).toBeDefined();
  });

  test('should initialize with default state', () => {
    const state = app.getState();
    expect(state.currentView).toBe('dashboard');
    expect(state.width).toBe(80);
    expect(state.height).toBe(24);
    expect(state.shouldQuit).toBe(false);
    expect(state.theme).toBe('light');
  });

  test('should switch views', () => {
    app.switchView('data');
    expect(app.getState().currentView).toBe('data');

    app.switchView('settings');
    expect(app.getState().currentView).toBe('settings');
  });

  test('should toggle theme', () => {
    expect(app.getState().theme).toBe('light');

    app.toggleTheme();
    expect(app.getState().theme).toBe('dark');

    app.toggleTheme();
    expect(app.getState().theme).toBe('light');
  });

  test('should get screen instance', () => {
    const screen = app.getScreen();
    expect(screen).toBeDefined();
  });
});
