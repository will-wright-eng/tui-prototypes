package styles

import (
	"github.com/charmbracelet/lipgloss"
)

// Styles contains all the styling for the application
type Styles struct {
	// Colors
	Primary   lipgloss.Color
	Secondary lipgloss.Color
	Success   lipgloss.Color
	Warning   lipgloss.Color
	Error     lipgloss.Color
	Info      lipgloss.Color

	// Background colors
	BgPrimary   lipgloss.Color
	BgSecondary lipgloss.Color
	BgSuccess   lipgloss.Color
	BgWarning   lipgloss.Color
	BgError     lipgloss.Color

	// Text colors
	TextPrimary   lipgloss.Color
	TextSecondary lipgloss.Color
	TextMuted     lipgloss.Color

	// Component styles
	Header    lipgloss.Style
	Sidebar   lipgloss.Style
	Content   lipgloss.Style
	StatusBar lipgloss.Style

	// Interactive elements
	Button       lipgloss.Style
	ButtonActive lipgloss.Style
	Input        lipgloss.Style
	InputFocus   lipgloss.Style

	// Special styles
	QuitText    lipgloss.Style
	Title       lipgloss.Style
	Subtitle    lipgloss.Style
	Text        lipgloss.Style
	MutedText   lipgloss.Style
	ErrorText   lipgloss.Style
	SuccessText lipgloss.Style
	WarningText lipgloss.Style

	// Layout styles
	Border      lipgloss.Style
	BorderFocus lipgloss.Style
	Padding     lipgloss.Style
	Margin      lipgloss.Style
}

// NewStyles creates a new styles instance with default styling
func NewStyles() *Styles {
	s := &Styles{}
	s.initColors()
	s.initComponentStyles()
	return s
}

// initColors initializes the color palette
func (s *Styles) initColors() {
	// Primary colors
	s.Primary = lipgloss.Color("#007ACC")
	s.Secondary = lipgloss.Color("#6C757D")
	s.Success = lipgloss.Color("#28A745")
	s.Warning = lipgloss.Color("#FFC107")
	s.Error = lipgloss.Color("#DC3545")
	s.Info = lipgloss.Color("#17A2B8")

	// Background colors
	s.BgPrimary = lipgloss.Color("#FFFFFF")
	s.BgSecondary = lipgloss.Color("#F8F9FA")
	s.BgSuccess = lipgloss.Color("#D4EDDA")
	s.BgWarning = lipgloss.Color("#FFF3CD")
	s.BgError = lipgloss.Color("#F8D7DA")

	// Text colors
	s.TextPrimary = lipgloss.Color("#000000")
	s.TextSecondary = lipgloss.Color("#6C757D")
	s.TextMuted = lipgloss.Color("#ADB5BD")
}

// initComponentStyles initializes all component styles
func (s *Styles) initComponentStyles() {
	// Header style
	s.Header = lipgloss.NewStyle().
		Foreground(s.TextPrimary).
		Background(s.Primary).
		Bold(true).
		Align(lipgloss.Center).
		Padding(0, 1).
		Height(3)

	// Sidebar style
	s.Sidebar = lipgloss.NewStyle().
		Foreground(s.TextPrimary).
		Background(s.BgSecondary).
		Border(lipgloss.RoundedBorder()).
		BorderForeground(s.Secondary).
		Padding(1, 2).
		Width(20)

	// Content style
	s.Content = lipgloss.NewStyle().
		Foreground(s.TextPrimary).
		Background(s.BgPrimary).
		Border(lipgloss.RoundedBorder()).
		BorderForeground(s.Secondary).
		Padding(1, 2)

	// Status bar style
	s.StatusBar = lipgloss.NewStyle().
		Foreground(s.TextSecondary).
		Background(s.BgSecondary).
		Align(lipgloss.Center).
		Padding(0, 1).
		Height(1)

	// Button styles
	s.Button = lipgloss.NewStyle().
		Foreground(s.TextPrimary).
		Background(s.Primary).
		Padding(0, 1).
		Margin(0, 1)

	s.ButtonActive = lipgloss.NewStyle().
		Foreground(s.BgPrimary).
		Background(s.Primary).
		Bold(true).
		Padding(0, 1).
		Margin(0, 1)

	// Input styles
	s.Input = lipgloss.NewStyle().
		Foreground(s.TextPrimary).
		Background(s.BgPrimary).
		Border(lipgloss.RoundedBorder()).
		BorderForeground(s.Secondary).
		Padding(0, 1)

	s.InputFocus = lipgloss.NewStyle().
		Foreground(s.TextPrimary).
		Background(s.BgPrimary).
		Border(lipgloss.RoundedBorder()).
		BorderForeground(s.Primary).
		Padding(0, 1)

	// Text styles
	s.QuitText = lipgloss.NewStyle().
		Foreground(s.Success).
		Bold(true).
		Align(lipgloss.Center)

	s.Title = lipgloss.NewStyle().
		Foreground(s.Primary).
		Bold(true).
		Margin(1, 0)

	s.Subtitle = lipgloss.NewStyle().
		Foreground(s.Secondary).
		Bold(true).
		Margin(1, 0)

	s.Text = lipgloss.NewStyle().
		Foreground(s.TextPrimary)

	s.MutedText = lipgloss.NewStyle().
		Foreground(s.TextMuted)

	s.ErrorText = lipgloss.NewStyle().
		Foreground(s.Error).
		Bold(true)

	s.SuccessText = lipgloss.NewStyle().
		Foreground(s.Success).
		Bold(true)

	s.WarningText = lipgloss.NewStyle().
		Foreground(s.Warning).
		Bold(true)

	// Layout styles
	s.Border = lipgloss.NewStyle().
		Border(lipgloss.RoundedBorder()).
		BorderForeground(s.Secondary)

	s.BorderFocus = lipgloss.NewStyle().
		Border(lipgloss.RoundedBorder()).
		BorderForeground(s.Primary)

	s.Padding = lipgloss.NewStyle().
		Padding(1, 2)

	s.Margin = lipgloss.NewStyle().
		Margin(1, 0)
}

// GetButtonStyle returns the appropriate button style based on active state
func (s *Styles) GetButtonStyle(active bool) lipgloss.Style {
	if active {
		return s.ButtonActive
	}
	return s.Button
}

// GetInputStyle returns the appropriate input style based on focus state
func (s *Styles) GetInputStyle(focused bool) lipgloss.Style {
	if focused {
		return s.InputFocus
	}
	return s.Input
}
