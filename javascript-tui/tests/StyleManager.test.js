/**
 * Style Manager Tests
 *
 * Tests for the style manager class.
 */

const StyleManager = require('../src/styles/StyleManager');

describe('StyleManager', () => {
  let styleManager;

  beforeEach(() => {
    styleManager = new StyleManager();
  });

  afterEach(() => {
    styleManager = null;
  });

  test('should create a style manager instance', () => {
    expect(styleManager).toBeDefined();
    expect(styleManager.getCurrentTheme()).toBe('light');
  });

  test('should get current theme', () => {
    expect(styleManager.getCurrentTheme()).toBe('light');
  });

  test('should set theme', () => {
    styleManager.setTheme('dark');
    expect(styleManager.getCurrentTheme()).toBe('dark');

    styleManager.setTheme('light');
    expect(styleManager.getCurrentTheme()).toBe('light');
  });

  test('should toggle theme', () => {
    expect(styleManager.getCurrentTheme()).toBe('light');

    styleManager.toggleTheme();
    expect(styleManager.getCurrentTheme()).toBe('dark');

    styleManager.toggleTheme();
    expect(styleManager.getCurrentTheme()).toBe('light');
  });

  test('should get current theme colors', () => {
    const colors = styleManager.getCurrentThemeColors();
    expect(colors).toBeDefined();
    expect(colors.background).toBeDefined();
    expect(colors.foreground).toBeDefined();
    expect(colors.primary).toBeDefined();
  });

  test('should get style for different types', () => {
    const headerStyle = styleManager.getStyle('header');
    expect(headerStyle).toBeDefined();
    expect(headerStyle.bold).toBe(true);

    const contentStyle = styleManager.getStyle('content');
    expect(contentStyle).toBeDefined();

    const errorStyle = styleManager.getStyle('error');
    expect(errorStyle).toBeDefined();
    expect(errorStyle.bold).toBe(true);
  });

  test('should get span with styling', () => {
    const span = styleManager.getSpan('Test', 'title');
    expect(span).toBeDefined();
    expect(span.content).toBe('Test');
    expect(span.style).toBeDefined();
  });

  test('should get border style', () => {
    const borderStyle = styleManager.getBorderStyle();
    expect(borderStyle).toBeDefined();
    expect(borderStyle.type).toBe('line');
  });

  test('should get available themes', () => {
    const themes = styleManager.getAvailableThemes();
    expect(themes).toContain('light');
    expect(themes).toContain('dark');
  });

  test('should check if theme exists', () => {
    expect(styleManager.hasTheme('light')).toBe(true);
    expect(styleManager.hasTheme('dark')).toBe(true);
    expect(styleManager.hasTheme('nonexistent')).toBe(false);
  });
});
