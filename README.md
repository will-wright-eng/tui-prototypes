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

```bash
Counting lines of code in: tui-prototypes
==========================================

Language                  Lines      Files
----------------------------------------
Go                          915         11
JavaScript                 2179         15
JSON                         93          1
Rust                       1114          5
YAML                         84          1
----------------------------------------
TOTAL                      4385         33

Statistics:
- Average lines per file: 132
- Total files scanned: 33
- Total non-empty lines: 4385
```

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

### 🟨 JavaScript + Blessed TUI

**Location**: `javascript-tui/`

A modern TUI built with JavaScript and the Blessed framework, demonstrating:

- Dynamic language flexibility
- Rich ecosystem and npm packages
- Component-based architecture
- Event-driven programming
- Cross-platform compatibility

**Features**:

- Dashboard, Data Browser, Settings, and Help views
- Keyboard navigation (1-4 keys)
- Theme toggle (t key)
- Interactive data tables with sorting
- Status notifications
- Comprehensive testing with Jest

**Quick Start**:

```bash
cd javascript-tui
make setup
make run
```

## Design Documents

Comprehensive design documents are available in the `docs/` directory:

- [`bubble-tea-tui-design.md`](docs/bubble-tea-tui-design.md) - Go Bubble Tea TUI design
- [`ratatui-tui-design.md`](docs/ratatui-tui-design.md) - Rust Ratatui TUI design
- [`javascript-tui-design.md`](docs/javascript-tui-design.md) - JavaScript Blessed TUI design

## Common Features

All three prototypes share common functionality:

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
- **Node.js 18+** (for JavaScript prototype)
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

   # JavaScript Blessed TUI
   cd javascript-tui
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

| Feature | Go + Bubble Tea | Rust + Ratatui | JavaScript + Blessed |
|---------|----------------|----------------|---------------------|
| **Performance** | Good | Excellent (zero-cost abstractions) | Good |
| **Memory Safety** | Garbage collected | Compile-time safety | Garbage collected |
| **Type Safety** | Good | Excellent (exhaustive pattern matching) | Dynamic (TypeScript optional) |
| **Concurrency** | Goroutines | Async/await with Tokio | Event loop + Promises |
| **Error Handling** | Standard Go patterns | Explicit Result types | Try-catch + Promises |
| **Learning Curve** | Moderate | Steeper (ownership concepts) | Gentle |
| **Ecosystem** | Mature | Growing rapidly | Very mature |
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

- [Bubble Tea](https://github.com/charmbracelet/bubbletea) - Go TUI framework
- [Ratatui](https://github.com/ratatui-org/ratatui) - Rust TUI framework
- [Blessed](https://github.com/charmbracelet/blessed) - Node.js TUI framework
- [Lip Gloss](https://github.com/charmbracelet/lipgloss) - Go styling library
- [Crossterm](https://github.com/crossterm-rs/crossterm) - Cross-platform terminal manipulation

## Future Enhancements

- Additional language implementations (Python, C++, etc.)
- More complex UI patterns and interactions
- Real-world application examples
- Performance benchmarking
- Cross-platform testing automation
- TypeScript support for JavaScript prototype
- Plugin systems for extensibility
