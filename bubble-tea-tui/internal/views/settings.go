package views

import (
	"strings"

	"bubble-tea-tui/internal/styles"

	tea "github.com/charmbracelet/bubbletea"
)

// SettingsView represents the settings view
type SettingsView struct {
	styles *styles.Styles
	width  int
	height int
}

// NewSettingsView creates a new settings view
func NewSettingsView(styles *styles.Styles) *SettingsView {
	return &SettingsView{
		styles: styles,
		width:  60,
		height: 20,
	}
}

// Init initializes the settings view
func (s *SettingsView) Init() tea.Cmd {
	return nil
}

// Update handles messages for the settings view
func (s *SettingsView) Update(msg tea.Msg) (tea.Model, tea.Cmd) {
	switch msg := msg.(type) {
	case tea.WindowSizeMsg:
		s.width = msg.Width - 22
		s.height = msg.Height - 4
	}
	return s, nil
}

// View renders the settings view
func (s *SettingsView) View() string {
	var content strings.Builder

	// Title
	content.WriteString(s.styles.Title.Render("⚙️ Settings"))
	content.WriteString("\n\n")

	// Theme settings
	content.WriteString(s.styles.Subtitle.Render("Theme Settings:"))
	content.WriteString("\n")
	content.WriteString("• " + s.styles.Button.Render("Light Theme") + " (current)")
	content.WriteString("\n")
	content.WriteString("• " + s.styles.Button.Render("Dark Theme"))
	content.WriteString("\n\n")

	// Display settings
	content.WriteString(s.styles.Subtitle.Render("Display Settings:"))
	content.WriteString("\n")
	content.WriteString("• " + s.styles.SuccessText.Render("✓") + " Show borders")
	content.WriteString("\n")
	content.WriteString("• " + s.styles.SuccessText.Render("✓") + " Show status bar")
	content.WriteString("\n")
	content.WriteString("• " + s.styles.SuccessText.Render("✓") + " Show navigation")
	content.WriteString("\n")
	content.WriteString("• " + s.styles.Text.Render("○") + " Compact mode")
	content.WriteString("\n\n")

	// Application settings
	content.WriteString(s.styles.Subtitle.Render("Application Settings:"))
	content.WriteString("\n")
	content.WriteString("• Auto-save: " + s.styles.SuccessText.Render("Enabled"))
	content.WriteString("\n")
	content.WriteString("• Notifications: " + s.styles.SuccessText.Render("Enabled"))
	content.WriteString("\n")
	content.WriteString("• Debug mode: " + s.styles.Text.Render("Disabled"))
	content.WriteString("\n")
	content.WriteString("• Log level: " + s.styles.Text.Foreground(s.styles.Info).Render("Info"))
	content.WriteString("\n\n")

	// Keyboard shortcuts
	content.WriteString(s.styles.Subtitle.Render("Keyboard Shortcuts:"))
	content.WriteString("\n")
	content.WriteString("• " + s.styles.MutedText.Render("1-4") + " - Navigate views")
	content.WriteString("\n")
	content.WriteString("• " + s.styles.MutedText.Render("q") + " - Quit application")
	content.WriteString("\n")
	content.WriteString("• " + s.styles.MutedText.Render("Ctrl+C") + " - Force quit")
	content.WriteString("\n")
	content.WriteString("• " + s.styles.MutedText.Render("Tab") + " - Focus next element")
	content.WriteString("\n")
	content.WriteString("• " + s.styles.MutedText.Render("Enter") + " - Activate/Confirm")

	return content.String()
}

// GetTitle returns the title of the settings view
func (s *SettingsView) GetTitle() string {
	return "Settings"
}

// GetDescription returns the description of the settings view
func (s *SettingsView) GetDescription() string {
	return "Application configuration"
}
