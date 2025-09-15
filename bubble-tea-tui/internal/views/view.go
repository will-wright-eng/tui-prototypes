package views

import tea "github.com/charmbracelet/bubbletea"

// View represents a view interface that all views must implement
type View interface {
	tea.Model
	GetTitle() string
	GetDescription() string
}
