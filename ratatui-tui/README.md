# Ratatui TUI Prototype

A modern Terminal User Interface (TUI) built with Rust and the Ratatui framework. This prototype demonstrates best practices for building high-performance, memory-safe terminal applications.

## Features

- 🦀 **Rust Performance**: Zero-cost abstractions with excellent performance
- 🛡️ **Memory Safety**: No garbage collection, compile-time safety
- 🎨 **Modern Design**: Clean, responsive interface with professional styling
- 🧭 **Navigation**: Easy navigation between multiple views using keyboard shortcuts
- 📱 **Responsive**: Adapts to different terminal sizes
- ⌨️ **Keyboard-First**: Full keyboard navigation support
- 🎯 **Component-Based**: Modular architecture with reusable widgets
- 🎨 **Theming**: Consistent styling system with customizable themes

## Views

1. **Dashboard** - Overview and quick actions
2. **Data Browser** - View and manage data in table format
3. **Settings** - Application configuration
4. **Help** - Documentation and keyboard shortcuts

## Quick Start

### Prerequisites

- Rust 1.70 or later
- A terminal that supports ANSI colors

### Installation

1. Clone or download this project
2. Navigate to the project directory
3. Install dependencies:

   ```bash
   make deps
   ```

### Running the Application

```bash
# Run directly
make run

# Or build and run
make build
./target/debug/ratatui-tui
```

## Development

### Available Make Commands

```bash
make help          # Show all available commands
make run           # Run the application
make build         # Build the binary (debug)
make build-release # Build the binary (release)
make test          # Run tests
make fmt           # Format code
make lint          # Run linter
make clean         # Clean build artifacts
make setup         # Setup development environment
```

### Development Workflow

1. **Setup**: Run `make setup` to install development tools
2. **Development**: Use `make run` for quick testing
3. **Testing**: Run `make test` to run tests
4. **Linting**: Use `make lint` to check code quality
5. **Building**: Use `make build` to create debug binaries

## Keyboard Shortcuts

- `1-4` - Navigate between views
- `q` or `Esc` - Quit application
- `t` - Toggle between light and dark themes
- `Ctrl+C` - Force quit

## Architecture

The application follows a component-based architecture:

- **Widgets**: Reusable UI components (Header, Sidebar, Content, StatusBar)
- **Views**: Application screens (Dashboard, Data Browser, Settings, Help)
- **Styles**: Theming system with light/dark themes
- **App**: Main application state and event handling

### Project Structure

```
ratatui-tui/
├── src/
│   ├── main.rs           # Application entry point
│   ├── app.rs           # Main application logic
│   ├── widgets.rs       # UI widgets
│   ├── views.rs         # Application views
│   └── styles.rs        # Styling and theming
├── tests/               # Integration tests
├── Cargo.toml          # Dependencies and configuration
├── Makefile            # Build and development commands
└── README.md           # This file
```

## Components

- **HeaderWidget**: Application title and branding
- **SidebarWidget**: Navigation menu with shortcuts
- **ContentWidget**: Main content area for views
- **StatusBarWidget**: System information and current state

## Styling

The application uses a comprehensive styling system:

- **Colors**: Primary, secondary, success, warning, error, info
- **Typography**: Titles, subtitles, body text, muted text
- **Components**: Buttons, inputs, borders, layouts
- **Themes**: Light theme (default), dark theme support

## Testing

The project includes comprehensive testing:

- **Unit Tests**: Component logic and state management
- **Integration Tests**: View integration and navigation
- **Property-Based Tests**: Using `proptest` for edge cases
- **Benchmarks**: Performance testing with `criterion`

## Performance

- **Zero-Cost Abstractions**: Leveraging Rust's compile-time optimizations
- **Memory Safety**: No garbage collection, predictable performance
- **Efficient Rendering**: Only render visible widgets
- **Event Batching**: Efficient event processing

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is open source and available under the MIT License.

## Acknowledgments

- [Ratatui](https://github.com/ratatui-org/ratatui) - The TUI framework
- [Crossterm](https://github.com/crossterm-rs/crossterm) - Terminal manipulation
- [Tokio](https://tokio.rs/) - Async runtime
- [Rust](https://www.rust-lang.org/) - Programming language
