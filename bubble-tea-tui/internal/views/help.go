package views

import (
	"strings"

	"bubble-tea-tui/internal/styles"

	tea "github.com/charmbracelet/bubbletea"
)

// HelpView represents the help view
type HelpView struct {
	styles *styles.Styles
	width  int
	height int
}

// NewHelpView creates a new help view
func NewHelpView(styles *styles.Styles) *HelpView {
	return &HelpView{
		styles: styles,
		width:  60,
		height: 20,
	}
}

// Init initializes the help view
func (h *HelpView) Init() tea.Cmd {
	return nil
}

// Update handles messages for the help view
func (h *HelpView) Update(msg tea.Msg) (tea.Model, tea.Cmd) {
	switch msg := msg.(type) {
	case tea.WindowSizeMsg:
		h.width = msg.Width - 22
		h.height = msg.Height - 4
	}
	return h, nil
}

// View renders the help view
func (h *HelpView) View() string {
	var content strings.Builder

	// Title
	content.WriteString(h.styles.Title.Render("❓ Help & Documentation"))
	content.WriteString("\n\n")

	// About section
	content.WriteString(h.styles.Subtitle.Render("About Bubble Tea TUI:"))
	content.WriteString("\n")
	content.WriteString("This is a prototype Terminal User Interface built with the Go Bubble Tea framework.")
	content.WriteString("\n")
	content.WriteString("It demonstrates modern TUI patterns and best practices.")
	content.WriteString("\n\n")

	// Navigation help
	content.WriteString(h.styles.Subtitle.Render("Navigation:"))
	content.WriteString("\n")
	content.WriteString("• " + h.styles.MutedText.Render("1") + " - Dashboard: Overview and quick actions")
	content.WriteString("\n")
	content.WriteString("• " + h.styles.MutedText.Render("2") + " - Data Browser: View and manage data")
	content.WriteString("\n")
	content.WriteString("• " + h.styles.MutedText.Render("3") + " - Settings: Configure application")
	content.WriteString("\n")
	content.WriteString("• " + h.styles.MutedText.Render("4") + " - Help: This documentation")
	content.WriteString("\n\n")

	// Keyboard shortcuts
	content.WriteString(h.styles.Subtitle.Render("Keyboard Shortcuts:"))
	content.WriteString("\n")
	content.WriteString("• " + h.styles.MutedText.Render("q") + " or " + h.styles.MutedText.Render("Ctrl+C") + " - Quit application")
	content.WriteString("\n")
	content.WriteString("• " + h.styles.MutedText.Render("1-4") + " - Switch between views")
	content.WriteString("\n")
	content.WriteString("• " + h.styles.MutedText.Render("Tab") + " - Focus next element")
	content.WriteString("\n")
	content.WriteString("• " + h.styles.MutedText.Render("Enter") + " - Activate/Confirm")
	content.WriteString("\n")
	content.WriteString("• " + h.styles.MutedText.Render("Escape") + " - Cancel/Go back")
	content.WriteString("\n\n")

	// Features
	content.WriteString(h.styles.Subtitle.Render("Features:"))
	content.WriteString("\n")
	content.WriteString("• " + h.styles.SuccessText.Render("✓") + " Responsive design")
	content.WriteString("\n")
	content.WriteString("• " + h.styles.SuccessText.Render("✓") + " Modern styling")
	content.WriteString("\n")
	content.WriteString("• " + h.styles.SuccessText.Render("✓") + " Keyboard navigation")
	content.WriteString("\n")
	content.WriteString("• " + h.styles.SuccessText.Render("✓") + " Multiple views")
	content.WriteString("\n")
	content.WriteString("• " + h.styles.SuccessText.Render("✓") + " Component-based architecture")
	content.WriteString("\n\n")

	// Tips
	content.WriteString(h.styles.Subtitle.Render("Tips:"))
	content.WriteString("\n")
	content.WriteString("• Resize your terminal window to see responsive design")
	content.WriteString("\n")
	content.WriteString("• Use number keys for quick navigation")
	content.WriteString("\n")
	content.WriteString("• Check the status bar for current view information")

	return content.String()
}

// GetTitle returns the title of the help view
func (h *HelpView) GetTitle() string {
	return "Help"
}

// GetDescription returns the description of the help view
func (h *HelpView) GetDescription() string {
	return "Documentation and help"
}
