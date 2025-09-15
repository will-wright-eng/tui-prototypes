package components

import (
	"bubble-tea-tui/internal/styles"

	tea "github.com/charmbracelet/bubbletea"
)

// Content represents the main content area component
type Content struct {
	styles *styles.Styles
	width  int
	height int
}

// NewContent creates a new content component
func NewContent(styles *styles.Styles) *Content {
	return &Content{
		styles: styles,
		width:  60,
		height: 20,
	}
}

// Init initializes the content component
func (c *Content) Init() tea.Cmd {
	return nil
}

// Update handles messages for the content component
func (c *Content) Update(msg tea.Msg) (tea.Model, tea.Cmd) {
	switch msg := msg.(type) {
	case tea.WindowSizeMsg:
		c.width = msg.Width - 22  // Account for sidebar width
		c.height = msg.Height - 4 // Account for header and status bar
	}
	return c, nil
}

// View renders the content component (required by tea.Model interface)
func (c *Content) View() string {
	return ""
}

// ViewWithContent renders the content component with the provided content
func (c *Content) ViewWithContent(content string, width, height int) string {
	// Apply content styling with dynamic dimensions
	return c.styles.Content.
		Width(width).
		Height(height).
		Render(content)
}
