package app

import (
	"github.com/will-wright-eng/prototype/internal/conversation"

	tea "github.com/charmbracelet/bubbletea"
	"github.com/charmbracelet/lipgloss"
)

// AppState represents the current state of the application
type AppState struct {
	Width    int
	Height   int
	Quitting bool
}

// App is the main application model
type App struct {
	state        AppState
	conversation *conversation.Conversation
}

// NewApp creates a new application instance
func NewApp() *App {
	return &App{
		state: AppState{
			Width:  80,
			Height: 24,
		},
		conversation: conversation.NewConversation(),
	}
}

// Init initializes the application
func (a *App) Init() tea.Cmd {
	return a.conversation.Init()
}

// Update handles messages and updates the application state
func (a *App) Update(msg tea.Msg) (tea.Model, tea.Cmd) {
	switch msg := msg.(type) {
	case tea.WindowSizeMsg:
		a.state.Width = msg.Width
		a.state.Height = msg.Height

	case tea.KeyMsg:
		switch msg.String() {
		case "ctrl+c", "q":
			a.state.Quitting = true
			return a, tea.Quit
		}
	}

	// Update conversation
	conv, cmd := a.conversation.Update(msg)
	a.conversation = conv.(*conversation.Conversation)

	return a, cmd
}

// View renders the application
func (a *App) View() string {
	if a.state.Quitting {
		quitStyle := lipgloss.NewStyle().
			Bold(true).
			Foreground(lipgloss.Color("205")).
			Align(lipgloss.Center)
		return quitStyle.Render("Thanks for chatting! 👋")
	}

	return a.conversation.View()
}
