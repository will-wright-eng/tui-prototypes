# Bubble Tea TUI Prototype

A modern Terminal User Interface (TUI) built with Go and the Bubble Tea framework. This prototype demonstrates best practices for building responsive, interactive terminal applications.

## Features

- 🎨 **Modern Design**: Clean, responsive interface with professional styling
- 🧭 **Navigation**: Easy navigation between multiple views using keyboard shortcuts
- 📱 **Responsive**: Adapts to different terminal sizes
- ⌨️ **Keyboard-First**: Full keyboard navigation support
- 🎯 **Component-Based**: Modular architecture with reusable components
- 🎨 **Theming**: Consistent styling system with customizable themes

## Views

1. **Dashboard** - Overview and quick actions
2. **Data Browser** - View and manage data in table format
3. **Settings** - Application configuration
4. **Help** - Documentation and keyboard shortcuts

## Quick Start

### Prerequisites

- Go 1.21 or later
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
./build/bubble-tea-tui
```

## Development

### Available Make Commands

```bash
make help          # Show all available commands
make run           # Run the application
make build         # Build the binary
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
5. **Building**: Use `make build` to create release binaries

## Keyboard Shortcuts

- `1-4` - Navigate between views
- `q` or `Ctrl+C` - Quit application
- `Tab` - Focus next element
- `Enter` - Activate/Confirm
- `Escape` - Cancel/Go back

## Architecture

The application follows the Model-View-Update (MVU) pattern used by Bubble Tea:

- **Models**: Represent application state
- **Views**: Render the UI
- **Updates**: Handle messages and state changes

### Project Structure

```
bubble-tea-tui/
├── cmd/                    # Application entry point
│   └── main.go
├── internal/
│   ├── app/               # Main application logic
│   ├── components/        # Reusable UI components
│   ├── styles/           # Styling and theming
│   └── views/            # Application views
├── pkg/                  # Public packages (if any)
├── Makefile             # Build and development commands
└── README.md            # This file
```

## Components

- **Header**: Application title and branding
- **Sidebar**: Navigation menu with shortcuts
- **Content**: Main content area for views
- **Status Bar**: System information and current state

## Styling

The application uses Lip Gloss for styling with a consistent design system:

- **Colors**: Primary, secondary, success, warning, error
- **Typography**: Titles, subtitles, body text, muted text
- **Components**: Buttons, inputs, borders, layouts
- **Themes**: Light theme (default), with support for dark theme

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is open source and available under the MIT License.

## Acknowledgments

- [Bubble Tea](https://github.com/charmbracelet/bubbletea) - The TUI framework
- [Lip Gloss](https://github.com/charmbracelet/lipgloss) - Styling library
- [Bubbles](https://github.com/charmbracelet/bubbles) - Component library
