package styles

import (
	"testing"
)

func TestNewStyles(t *testing.T) {
	styles := NewStyles()

	if styles == nil {
		t.Fatal("NewStyles() returned nil")
	}

	// Test that colors are set
	if styles.Primary == "" {
		t.Error("Primary color should be set")
	}

	if styles.Secondary == "" {
		t.Error("Secondary color should be set")
	}

	if styles.Success == "" {
		t.Error("Success color should be set")
	}

	if styles.Warning == "" {
		t.Error("Warning color should be set")
	}

	if styles.Error == "" {
		t.Error("Error color should be set")
	}

	// Test that component styles are set (we can't compare lipgloss.Style directly)
	// Instead, we'll test that they render something
	if styles.Header.Render("test") == "" {
		t.Error("Header style should render content")
	}

	if styles.Sidebar.Render("test") == "" {
		t.Error("Sidebar style should render content")
	}

	if styles.Content.Render("test") == "" {
		t.Error("Content style should render content")
	}

	if styles.StatusBar.Render("test") == "" {
		t.Error("StatusBar style should render content")
	}
}

func TestGetButtonStyle(t *testing.T) {
	styles := NewStyles()

	// Test active button style
	activeStyle := styles.GetButtonStyle(true)
	if activeStyle.Render("test") == "" {
		t.Error("Active button style should render content")
	}

	// Test inactive button style
	inactiveStyle := styles.GetButtonStyle(false)
	if inactiveStyle.Render("test") == "" {
		t.Error("Inactive button style should render content")
	}

	// Test that both styles render content (they might be the same in this simple implementation)
	activeRendered := activeStyle.Render("test")
	inactiveRendered := inactiveStyle.Render("test")
	if activeRendered == "" || inactiveRendered == "" {
		t.Error("Both button styles should render content")
	}
}

func TestGetInputStyle(t *testing.T) {
	styles := NewStyles()

	// Test focused input style
	focusedStyle := styles.GetInputStyle(true)
	if focusedStyle.Render("test") == "" {
		t.Error("Focused input style should render content")
	}

	// Test unfocused input style
	unfocusedStyle := styles.GetInputStyle(false)
	if unfocusedStyle.Render("test") == "" {
		t.Error("Unfocused input style should render content")
	}

	// Test that both styles render content (they might be the same in this simple implementation)
	focusedRendered := focusedStyle.Render("test")
	unfocusedRendered := unfocusedStyle.Render("test")
	if focusedRendered == "" || unfocusedRendered == "" {
		t.Error("Both input styles should render content")
	}
}
