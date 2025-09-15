package components

import (
	"fmt"
	"strings"

	"bubble-tea-tui/internal/styles"

	tea "github.com/charmbracelet/bubbletea"
	"github.com/charmbracelet/lipgloss"
)

// Sidebar represents the navigation sidebar component
type Sidebar struct {
	styles *styles.Styles
	width  int
	height int
	items  []SidebarItem
}

// SidebarItem represents a navigation item in the sidebar
type SidebarItem struct {
	ID    string
	Label string
	Key   string
}

// NewSidebar creates a new sidebar component
func NewSidebar(styles *styles.Styles) *Sidebar {
	return &Sidebar{
		styles: styles,
		width:  20,
		height: 20,
		items: []SidebarItem{
			{ID: "dashboard", Label: "📊 Dashboard", Key: "1"},
			{ID: "data", Label: "📁 Data Browser", Key: "2"},
			{ID: "settings", Label: "⚙️ Settings", Key: "3"},
			{ID: "help", Label: "❓ Help", Key: "4"},
		},
	}
}

// Init initializes the sidebar component
func (s *Sidebar) Init() tea.Cmd {
	return nil
}

// Update handles messages for the sidebar component
func (s *Sidebar) Update(msg tea.Msg) (tea.Model, tea.Cmd) {
	switch msg := msg.(type) {
	case tea.WindowSizeMsg:
		s.height = msg.Height - 4 // Account for header and status bar
	}
	return s, nil
}

// View renders the sidebar component (required by tea.Model interface)
func (s *Sidebar) View() string {
	return ""
}

// ViewWithCurrent renders the sidebar component with current view
func (s *Sidebar) ViewWithCurrent(currentView string) string {
	var content strings.Builder

	// Add title
	content.WriteString(s.styles.Subtitle.Render("Navigation"))
	content.WriteString("\n\n")

	// Add navigation items
	for _, item := range s.items {
		active := item.ID == currentView
		itemStyle := s.getItemStyle(active)
		content.WriteString(itemStyle.Render(fmt.Sprintf("%s %s", item.Key, item.Label)))
		content.WriteString("\n")
	}

	// Add separator
	content.WriteString("\n")
	content.WriteString(strings.Repeat("─", s.width-4))
	content.WriteString("\n\n")

	// Add shortcuts
	content.WriteString(s.styles.MutedText.Render("Shortcuts:"))
	content.WriteString("\n")
	content.WriteString(s.styles.MutedText.Render("q - Quit"))
	content.WriteString("\n")
	content.WriteString(s.styles.MutedText.Render("1-4 - Navigate"))
	content.WriteString("\n")
	content.WriteString(s.styles.MutedText.Render("Ctrl+C - Quit"))

	// Apply sidebar styling
	return s.styles.Sidebar.
		Width(s.width).
		Height(s.height).
		Render(content.String())
}

// getItemStyle returns the appropriate style for a sidebar item
func (s *Sidebar) getItemStyle(active bool) lipgloss.Style {
	if active {
		return s.styles.ButtonActive.
			Width(s.width - 4).
			Align(lipgloss.Left)
	}
	return s.styles.Button.
		Width(s.width - 4).
		Align(lipgloss.Left)
}
