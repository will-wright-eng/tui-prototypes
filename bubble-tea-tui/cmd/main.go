package main

import (
	"fmt"
	"os"

	"bubble-tea-tui/internal/app"

	tea "github.com/charmbracelet/bubbletea"
)

func main() {
	// Initialize the application
	program := tea.NewProgram(app.NewApp(), tea.WithAltScreen())

	// Handle cleanup on exit
	defer func() {
		if r := recover(); r != nil {
			fmt.Printf("Application crashed: %v\n", r)
			os.Exit(1)
		}
	}()

	// Run the program
	if _, err := program.Run(); err != nil {
		fmt.Printf("Error running application: %v\n", err)
		os.Exit(1)
	}
}
