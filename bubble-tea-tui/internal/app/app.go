package app

import (
	"fmt"
	"strings"

	"bubble-tea-tui/internal/components"
	"bubble-tea-tui/internal/styles"
	"bubble-tea-tui/internal/views"

	tea "github.com/charmbracelet/bubbletea"
	"github.com/charmbracelet/lipgloss"
)

// AppState represents the current state of the application
type AppState struct {
	CurrentView string
	Width       int
	Height      int
	Quitting    bool
}

// App is the main application model
type App struct {
	state   AppState
	styles  *styles.Styles
	header  *components.Header
	sidebar *components.Sidebar
	content *components.Content
	views   map[string]views.View
}

// NewApp creates a new application instance
func NewApp() *App {
	appStyles := styles.NewStyles()

	return &App{
		state: AppState{
			CurrentView: "dashboard",
			Width:       80,
			Height:      24,
		},
		styles:  appStyles,
		header:  components.NewHeader(appStyles),
		sidebar: components.NewSidebar(appStyles),
		content: components.NewContent(appStyles),
		views: map[string]views.View{
			"dashboard": views.NewDashboardView(appStyles),
			"data":      views.NewDataView(appStyles),
			"settings":  views.NewSettingsView(appStyles),
			"help":      views.NewHelpView(appStyles),
		},
	}
}

// Init initializes the application
func (a *App) Init() tea.Cmd {
	return tea.Batch(
		a.header.Init(),
		a.sidebar.Init(),
		a.content.Init(),
		a.views[a.state.CurrentView].Init(),
	)
}

// Update handles messages and updates the application state
func (a *App) Update(msg tea.Msg) (tea.Model, tea.Cmd) {
	var cmds []tea.Cmd

	switch msg := msg.(type) {
	case tea.WindowSizeMsg:
		a.state.Width = msg.Width
		a.state.Height = msg.Height

		// Update all components with new dimensions
		header, cmd1 := a.header.Update(msg)
		a.header = header.(*components.Header)
		cmds = append(cmds, cmd1)

		sidebar, cmd2 := a.sidebar.Update(msg)
		a.sidebar = sidebar.(*components.Sidebar)
		cmds = append(cmds, cmd2)

		content, cmd3 := a.content.Update(msg)
		a.content = content.(*components.Content)
		cmds = append(cmds, cmd3)

		view, cmd4 := a.views[a.state.CurrentView].Update(msg)
		a.views[a.state.CurrentView] = view.(views.View)
		cmds = append(cmds, cmd4)

	case tea.KeyMsg:
		switch msg.String() {
		case "ctrl+c", "q":
			a.state.Quitting = true
			return a, tea.Quit

		case "1":
			a.state.CurrentView = "dashboard"
			cmd := a.views[a.state.CurrentView].Init()
			cmds = append(cmds, cmd)

		case "2":
			a.state.CurrentView = "data"
			cmd := a.views[a.state.CurrentView].Init()
			cmds = append(cmds, cmd)

		case "3":
			a.state.CurrentView = "settings"
			cmd := a.views[a.state.CurrentView].Init()
			cmds = append(cmds, cmd)

		case "4":
			a.state.CurrentView = "help"
			cmd := a.views[a.state.CurrentView].Init()
			cmds = append(cmds, cmd)
		}
	}

	// Update current view
	view, cmd := a.views[a.state.CurrentView].Update(msg)
	a.views[a.state.CurrentView] = view.(views.View)
	cmds = append(cmds, cmd)

	return a, tea.Batch(cmds...)
}

// View renders the application
func (a *App) View() string {
	if a.state.Quitting {
		return a.styles.QuitText.Render("Thanks for using Bubble Tea TUI! 👋")
	}

	// Calculate layout dimensions
	headerHeight := 3
	sidebarWidth := 20
	statusHeight := 1

	contentWidth := a.state.Width - sidebarWidth
	contentHeight := a.state.Height - headerHeight - statusHeight

	// Render header
	header := a.header.View()

	// Render sidebar
	sidebar := a.sidebar.ViewWithCurrent(a.state.CurrentView)

	// Render content
	content := a.content.ViewWithContent(a.views[a.state.CurrentView].View(), contentWidth, contentHeight)

	// Render status bar
	status := a.renderStatusBar()

	// Combine all components
	layout := lipgloss.JoinVertical(
		lipgloss.Left,
		header,
		lipgloss.JoinHorizontal(
			lipgloss.Top,
			sidebar,
			content,
		),
		status,
	)

	return layout
}

// renderStatusBar renders the status bar at the bottom
func (a *App) renderStatusBar() string {
	statusText := fmt.Sprintf("View: %s | Press 'q' to quit | 1-4 for navigation",
		strings.Title(a.state.CurrentView))

	return a.styles.StatusBar.Render(statusText)
}
