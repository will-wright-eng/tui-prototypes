package app

import (
	"testing"
)

func TestNewApp(t *testing.T) {
	app := NewApp()

	if app == nil {
		t.Fatal("NewApp() returned nil")
	}

	if app.state.CurrentView != "dashboard" {
		t.Errorf("Expected current view to be 'dashboard', got '%s'", app.state.CurrentView)
	}

	if app.styles == nil {
		t.Fatal("App styles should not be nil")
	}

	if app.header == nil {
		t.Fatal("App header should not be nil")
	}

	if app.sidebar == nil {
		t.Fatal("App sidebar should not be nil")
	}

	if app.content == nil {
		t.Fatal("App content should not be nil")
	}

	if len(app.views) != 4 {
		t.Errorf("Expected 4 views, got %d", len(app.views))
	}

	// Check that all expected views exist
	expectedViews := []string{"dashboard", "data", "settings", "help"}
	for _, viewName := range expectedViews {
		if _, exists := app.views[viewName]; !exists {
			t.Errorf("Expected view '%s' not found", viewName)
		}
	}
}

func TestAppState(t *testing.T) {
	app := NewApp()

	// Test initial state
	if app.state.Width != 80 {
		t.Errorf("Expected initial width to be 80, got %d", app.state.Width)
	}

	if app.state.Height != 24 {
		t.Errorf("Expected initial height to be 24, got %d", app.state.Height)
	}

	if app.state.Quitting {
		t.Error("App should not be quitting initially")
	}
}
