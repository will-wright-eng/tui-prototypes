package views

import (
	"fmt"
	"strings"

	"bubble-tea-tui/internal/styles"

	tea "github.com/charmbracelet/bubbletea"
)

// DashboardView represents the dashboard view
type DashboardView struct {
	styles *styles.Styles
	width  int
	height int
}

// NewDashboardView creates a new dashboard view
func NewDashboardView(styles *styles.Styles) *DashboardView {
	return &DashboardView{
		styles: styles,
		width:  60,
		height: 20,
	}
}

// Init initializes the dashboard view
func (d *DashboardView) Init() tea.Cmd {
	return nil
}

// Update handles messages for the dashboard view
func (d *DashboardView) Update(msg tea.Msg) (tea.Model, tea.Cmd) {
	switch msg := msg.(type) {
	case tea.WindowSizeMsg:
		d.width = msg.Width - 22
		d.height = msg.Height - 4
	}
	return d, nil
}

// View renders the dashboard view
func (d *DashboardView) View() string {
	var content strings.Builder

	// Title
	content.WriteString(d.styles.Title.Render("📊 Dashboard"))
	content.WriteString("\n\n")

	// Welcome message
	content.WriteString(d.styles.Text.Render("Welcome to the Bubble Tea TUI Prototype!"))
	content.WriteString("\n\n")

	// Features overview
	content.WriteString(d.styles.Subtitle.Render("Features:"))
	content.WriteString("\n")
	content.WriteString("• " + d.styles.SuccessText.Render("✓") + " Modern TUI interface")
	content.WriteString("\n")
	content.WriteString("• " + d.styles.SuccessText.Render("✓") + " Responsive design")
	content.WriteString("\n")
	content.WriteString("• " + d.styles.SuccessText.Render("✓") + " Keyboard navigation")
	content.WriteString("\n")
	content.WriteString("• " + d.styles.SuccessText.Render("✓") + " Multiple views")
	content.WriteString("\n")
	content.WriteString("• " + d.styles.SuccessText.Render("✓") + " Styled components")
	content.WriteString("\n\n")

	// Quick stats
	content.WriteString(d.styles.Subtitle.Render("Quick Stats:"))
	content.WriteString("\n")
	content.WriteString(fmt.Sprintf("• Views: %s\n", d.styles.Text.Foreground(d.styles.Info).Render("4")))
	content.WriteString(fmt.Sprintf("• Components: %s\n", d.styles.Text.Foreground(d.styles.Info).Render("3")))
	content.WriteString(fmt.Sprintf("• Themes: %s\n", d.styles.Text.Foreground(d.styles.Info).Render("2")))
	content.WriteString("\n")

	// Instructions
	content.WriteString(d.styles.Subtitle.Render("Getting Started:"))
	content.WriteString("\n")
	content.WriteString("Use the number keys (1-4) to navigate between views:")
	content.WriteString("\n")
	content.WriteString("1 - Dashboard (current)")
	content.WriteString("\n")
	content.WriteString("2 - Data Browser")
	content.WriteString("\n")
	content.WriteString("3 - Settings")
	content.WriteString("\n")
	content.WriteString("4 - Help")
	content.WriteString("\n\n")
	content.WriteString("Press 'q' or Ctrl+C to quit.")

	return content.String()
}

// GetTitle returns the title of the dashboard view
func (d *DashboardView) GetTitle() string {
	return "Dashboard"
}

// GetDescription returns the description of the dashboard view
func (d *DashboardView) GetDescription() string {
	return "Overview and quick actions"
}
