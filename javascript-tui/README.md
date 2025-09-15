# JavaScript TUI Prototype

A modern Terminal User Interface (TUI) built with JavaScript and the Blessed framework, demonstrating modern TUI development patterns and best practices.

## Overview

This prototype showcases a responsive, interactive command-line interface that provides a rich user experience while maintaining the efficiency and simplicity of terminal-based applications. It serves as the JavaScript equivalent to the Go and Rust TUI prototypes in this repository.

## Features

- **Modern TUI Interface**: Clean, responsive design with professional styling
- **Component-Based Architecture**: Reusable UI components and widgets
- **Multiple Views**: Dashboard, Data Browser, Settings, and Help views
- **Keyboard Navigation**: Full keyboard navigation support (1-4 keys)
- **Theme System**: Light and dark theme support
- **Responsive Design**: Adapts to different terminal sizes
- **Cross-Platform**: Works on Windows, macOS, and Linux

## Quick Start

### Prerequisites

- **Node.js 18+**: JavaScript runtime environment
- Terminal with ANSI color support

### Installation

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd tui-prototypes/javascript-tui
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Run the application**:

   ```bash
   npm start
   ```

## Usage

### Navigation

- **1-4**: Switch between views
- **q/Esc**: Quit application
- **Ctrl+C**: Force quit
- **t**: Toggle theme (light/dark)

### Views

1. **Dashboard** - Overview and quick actions
2. **Data Browser** - Tabular data display
3. **Settings** - Configuration options
4. **Help** - Documentation and shortcuts

## Development

### Available Scripts

- **`npm start`**: Run the application
- **`npm run dev`**: Run with auto-restart on file changes
- **`npm test`**: Run tests
- **`npm run test:watch`**: Run tests in watch mode
- **`npm run test:coverage`**: Run tests with coverage report
- **`npm run lint`**: Lint code
- **`npm run lint:fix`**: Fix linting issues
- **`npm run format`**: Format code with Prettier

### Project Structure

```
javascript-tui/
├── src/
│   ├── app/           # Main application logic
│   ├── components/    # Reusable UI components
│   ├── views/         # Application views
│   ├── styles/        # Styling and theming
│   ├── utils/         # Utility functions
│   └── index.js       # Application entry point
├── tests/             # Test files
├── docs/              # Documentation
├── package.json       # Project configuration
└── README.md          # This file
```

### Architecture

The application follows a component-based architecture with:

- **App**: Main application class managing state and coordination
- **Components**: Reusable UI widgets (Header, Sidebar, Content, StatusBar)
- **Views**: Application screens (Dashboard, Data, Settings, Help)
- **StyleManager**: Theme and styling system
- **EventHandlers**: Keyboard and mouse event management

## Technology Stack

- **Blessed**: TUI framework for Node.js
- **Blessed-Contrib**: Additional widgets and components
- **Chalk**: Terminal string styling
- **Jest**: Testing framework
- **ESLint**: Code linting
- **Prettier**: Code formatting

## Design Principles

- **Responsive**: Adapts to different terminal sizes
- **Keyboard-First**: Full keyboard navigation
- **Component-Based**: Reusable UI components
- **Themed**: Consistent styling systems
- **Tested**: Comprehensive test coverage

## Comparison with Other Prototypes

| Feature | Go + Bubble Tea | Rust + Ratatui | JavaScript + Blessed |
|---------|----------------|----------------|---------------------|
| **Performance** | Good | Excellent | Good |
| **Memory Safety** | Garbage collected | Compile-time safety | Garbage collected |
| **Type Safety** | Good | Excellent | Dynamic (TypeScript optional) |
| **Ecosystem** | Mature | Growing | Very mature |
| **Learning Curve** | Moderate | Steeper | Gentle |
| **Development Speed** | Good | Good | Excellent |

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is open source and available under the MIT License.

## Acknowledgments

- [Blessed](https://github.com/charmbracelet/blessed) - Node.js TUI framework
- [Blessed-Contrib](https://github.com/yaronn/blessed-contrib) - Additional widgets
- [Chalk](https://github.com/chalk/chalk) - Terminal string styling
- [Jest](https://jestjs.io/) - Testing framework

## Future Enhancements

- TypeScript support
- Plugin system for extensibility
- Advanced data visualization
- Configuration file support
- WebSocket integration
- Performance optimizations
