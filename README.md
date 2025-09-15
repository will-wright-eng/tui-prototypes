# TUI Prototypes

A collection of Terminal User Interface (TUI) prototypes demonstrating modern TUI development patterns and best practices across different programming languages and frameworks.

## Overview

This repository contains working prototypes of TUI applications built with different technologies, showcasing various approaches to terminal-based user interface development. Each prototype demonstrates:

- Modern TUI design patterns
- Responsive layouts
- Component-based architecture
- Keyboard navigation
- Theming and styling systems
- Cross-platform compatibility

## Prototypes

### 🐹 Go + Bubble Tea TUI
**Location**: `bubble-tea-tui/`

A modern TUI built with Go and the Bubble Tea framework, demonstrating:
- Model-View-Update (MVU) architecture
- Component composition
- Responsive design
- Multiple views with navigation
- Professional styling with Lip Gloss

**Features**:
- Dashboard, Data Browser, Settings, and Help views
- Keyboard navigation (1-4 keys)
- Styled components and theming
- Comprehensive testing

**Quick Start**:
```bash
cd bubble-tea-tui
make run
```

### 🦀 Rust + Ratatui TUI
**Location**: `ratatui-tui/`

A high-performance TUI built with Rust and the Ratatui framework, showcasing:
- Memory safety and zero-cost abstractions
- Trait-based widget system
- Type-safe state management
- Async support with Tokio
- Comprehensive error handling

**Features**:
- Dashboard, Data Browser, Settings, and Help views
- Keyboard navigation (1-4 keys)
- Theme toggle (t key)
- Widget-based architecture
- Extensive testing suite

**Quick Start**:
```bash
cd ratatui-tui
make run
```

## Design Documents

Comprehensive design documents are available in the `docs/` directory:

- [`bubble-tea-tui-design.md`](docs/bubble-tea-tui-design.md) - Go Bubble Tea TUI design
- [`ratatui-tui-design.md`](docs/ratatui-tui-design.md) - Rust Ratatui TUI design

## Common Features

Both prototypes share common functionality:

### Navigation
- **1-4**: Switch between views
- **q/Esc**: Quit application
- **Ctrl+C**: Force quit

### Views
1. **Dashboard** - Overview and quick actions
2. **Data Browser** - Tabular data display
3. **Settings** - Configuration options
4. **Help** - Documentation and shortcuts

### Design Principles
- **Responsive**: Adapts to different terminal sizes
- **Keyboard-First**: Full keyboard navigation
- **Component-Based**: Reusable UI components
- **Themed**: Consistent styling systems
- **Tested**: Comprehensive test coverage

## Development

### Prerequisites
- **Go 1.21+** (for Bubble Tea prototype)
- **Rust 1.70+** (for Ratatui prototype)
- Terminal with ANSI color support

### Getting Started

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd tui-prototypes
   ```

2. **Choose a prototype**:
   ```bash
   # Go Bubble Tea TUI
   cd bubble-tea-tui
   make setup
   make run
   
   # Rust Ratatui TUI
   cd ratatui-tui
   make setup
   make run
   ```

### Development Workflow

Each prototype includes comprehensive development tools:

- **Build**: `make build`
- **Test**: `make test`
- **Format**: `make fmt`
- **Lint**: `make lint`
- **Run**: `make run`

## Architecture Comparison

| Feature | Go + Bubble Tea | Rust + Ratatui |
|---------|----------------|----------------|
| **Performance** | Good | Excellent (zero-cost abstractions) |
| **Memory Safety** | Garbage collected | Compile-time safety |
| **Type Safety** | Good | Excellent (exhaustive pattern matching) |
| **Concurrency** | Goroutines | Async/await with Tokio |
| **Error Handling** | Standard Go patterns | Explicit Result types |
| **Learning Curve** | Moderate | Steeper (ownership concepts) |
| **Ecosystem** | Mature | Growing rapidly |

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is open source and available under the MIT License.

## Acknowledgments

- [Bubble Tea](https://github.com/charmbracelet/bubbletea) - Go TUI framework
- [Ratatui](https://github.com/ratatui-org/ratatui) - Rust TUI framework
- [Lip Gloss](https://github.com/charmbracelet/lipgloss) - Go styling library
- [Crossterm](https://github.com/crossterm-rs/crossterm) - Cross-platform terminal manipulation

## Future Enhancements

- Additional language implementations (Python, JavaScript, etc.)
- More complex UI patterns and interactions
- Real-world application examples
- Performance benchmarking
- Cross-platform testing automation
