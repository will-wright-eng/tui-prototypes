package views

import (
	"fmt"
	"strings"

	"bubble-tea-tui/internal/styles"

	tea "github.com/charmbracelet/bubbletea"
)

// DataView represents the data browser view
type DataView struct {
	styles *styles.Styles
	width  int
	height int
}

// NewDataView creates a new data view
func NewDataView(styles *styles.Styles) *DataView {
	return &DataView{
		styles: styles,
		width:  60,
		height: 20,
	}
}

// Init initializes the data view
func (d *DataView) Init() tea.Cmd {
	return nil
}

// Update handles messages for the data view
func (d *DataView) Update(msg tea.Msg) (tea.Model, tea.Cmd) {
	switch msg := msg.(type) {
	case tea.WindowSizeMsg:
		d.width = msg.Width - 22
		d.height = msg.Height - 4
	}
	return d, nil
}

// View renders the data view
func (d *DataView) View() string {
	var content strings.Builder

	// Title
	content.WriteString(d.styles.Title.Render("📁 Data Browser"))
	content.WriteString("\n\n")

	// Sample data table
	content.WriteString(d.styles.Subtitle.Render("Sample Data Table:"))
	content.WriteString("\n\n")

	// Table header
	header := fmt.Sprintf("%-15s %-20s %-10s %-8s", "ID", "Name", "Status", "Value")
	content.WriteString(d.styles.Button.Render(header))
	content.WriteString("\n")

	// Table separator
	content.WriteString(strings.Repeat("─", 60))
	content.WriteString("\n")

	// Sample rows
	rows := []struct {
		ID     string
		Name   string
		Status string
		Value  string
	}{
		{"001", "Project Alpha", "Active", "$1,234"},
		{"002", "Project Beta", "Pending", "$5,678"},
		{"003", "Project Gamma", "Completed", "$9,012"},
		{"004", "Project Delta", "Active", "$3,456"},
		{"005", "Project Epsilon", "Cancelled", "$0"},
	}

	for _, row := range rows {
		statusColor := d.styles.Success
		if row.Status == "Pending" {
			statusColor = d.styles.Warning
		} else if row.Status == "Cancelled" {
			statusColor = d.styles.Error
		}

		rowText := fmt.Sprintf("%-15s %-20s %-10s %-8s",
			row.ID,
			row.Name,
			d.styles.Text.Foreground(statusColor).Render(row.Status),
			row.Value)
		content.WriteString(rowText)
		content.WriteString("\n")
	}

	content.WriteString("\n")

	// Data summary
	content.WriteString(d.styles.Subtitle.Render("Data Summary:"))
	content.WriteString("\n")
	content.WriteString(fmt.Sprintf("• Total Records: %s\n", d.styles.Text.Foreground(d.styles.Info).Render("5")))
	content.WriteString(fmt.Sprintf("• Active: %s\n", d.styles.SuccessText.Render("2")))
	content.WriteString(fmt.Sprintf("• Pending: %s\n", d.styles.WarningText.Render("1")))
	content.WriteString(fmt.Sprintf("• Completed: %s\n", d.styles.SuccessText.Render("1")))
	content.WriteString(fmt.Sprintf("• Cancelled: %s\n", d.styles.ErrorText.Render("1")))

	return content.String()
}

// GetTitle returns the title of the data view
func (d *DataView) GetTitle() string {
	return "Data Browser"
}

// GetDescription returns the description of the data view
func (d *DataView) GetDescription() string {
	return "Browse and manage data"
}
