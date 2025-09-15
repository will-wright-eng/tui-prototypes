package components

import (
	"bubble-tea-tui/internal/styles"

	tea "github.com/charmbracelet/bubbletea"
	"github.com/charmbracelet/lipgloss"
)

// Header represents the application header component
type Header struct {
	styles *styles.Styles
	title  string
	width  int
}

// NewHeader creates a new header component
func NewHeader(styles *styles.Styles) *Header {
	return &Header{
		styles: styles,
		title:  "Bubble Tea TUI",
		width:  80,
	}
}

// Init initializes the header component
func (h *Header) Init() tea.Cmd {
	return nil
}

// Update handles messages for the header component
func (h *Header) Update(msg tea.Msg) (tea.Model, tea.Cmd) {
	switch msg := msg.(type) {
	case tea.WindowSizeMsg:
		h.width = msg.Width
	}
	return h, nil
}

// View renders the header component
func (h *Header) View() string {
	// Create a styled title
	title := h.styles.Title.
		Foreground(h.styles.TextPrimary).
		Background(h.styles.Primary).
		Bold(true).
		Align(lipgloss.Center).
		Width(h.width).
		Height(3).
		Render(h.title)

	return title
}
