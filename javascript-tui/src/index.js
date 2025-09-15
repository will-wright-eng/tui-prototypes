#!/usr/bin/env node

/**
 * JavaScript TUI Prototype - Main Entry Point
 *
 * A modern Terminal User Interface built with JavaScript and Blessed.
 * Equivalent to the Go Bubble Tea and Rust Ratatui prototypes.
 */

const App = require('./app/App');

/**
 * Main application entry point
 */
function main() {
  try {
    console.log('Starting JavaScript TUI Prototype...');

    // Create and run the application
    const app = new App();
    app.run();

  } catch (error) {
    console.error('Application crashed:', error);
    process.exit(1);
  }
}

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Handle SIGINT (Ctrl+C)
process.on('SIGINT', () => {
  console.log('\nReceived SIGINT, shutting down gracefully...');
  process.exit(0);
});

// Handle SIGTERM
process.on('SIGTERM', () => {
  console.log('\nReceived SIGTERM, shutting down gracefully...');
  process.exit(0);
});

// Run the application
if (require.main === module) {
  main();
}

module.exports = { main };
