use ratatui::{
    layout::{Constraint, Rect},
    text::{Line, Span},
    widgets::{Block, Borders, Paragraph, Row, Table},
    Frame,
};

use crate::styles::{StyleManager, StyleType};

/// Trait for all views in the application
pub trait View {
    /// Render the view to the given area
    fn render(&mut self, area: Rect, f: &mut Frame);

    /// Get the title of the view
    fn get_title(&self) -> &str;

    /// Get the description of the view
    fn get_description(&self) -> &str;
}

/// Dashboard view
#[derive(Debug, Clone)]
pub struct DashboardView {
    style_manager: StyleManager,
}

impl DashboardView {
    pub fn new(style_manager: StyleManager) -> Self {
        Self { style_manager }
    }
}

impl View for DashboardView {
    fn render(&mut self, area: Rect, f: &mut Frame) {
        let content_style = self.style_manager.get_style(StyleType::Content);
        let block = Block::default()
            .style(content_style)
            .borders(Borders::ALL);

        let mut content = Vec::new();

        // Title
        let title_span = self.style_manager.get_span("📊 Dashboard", StyleType::Title);
        content.push(Line::from(vec![title_span]));
        content.push(Line::from(""));

        // Welcome message
        let welcome_span = self.style_manager.get_span(
            "Welcome to the Ratatui TUI Prototype!",
            StyleType::Text,
        );
        content.push(Line::from(vec![welcome_span]));
        content.push(Line::from(""));

        // Features overview
        let features_title = self.style_manager.get_span("Features:", StyleType::Subtitle);
        content.push(Line::from(vec![features_title]));

        let features = vec![
            "• Modern TUI interface",
            "• Responsive design",
            "• Keyboard navigation",
            "• Multiple views",
            "• Styled components",
        ];

        for feature in features {
            let feature_span = self.style_manager.get_span(feature, StyleType::Text);
            content.push(Line::from(vec![feature_span]));
        }

        content.push(Line::from(""));

        // Quick stats
        let stats_title = self.style_manager.get_span("Quick Stats:", StyleType::Subtitle);
        content.push(Line::from(vec![stats_title]));

        let stats = vec![
            "• Views: 4",
            "• Components: 4",
            "• Themes: 2",
        ];

        for stat in stats {
            let stat_span = self.style_manager.get_span(stat, StyleType::Info);
            content.push(Line::from(vec![stat_span]));
        }

        content.push(Line::from(""));

        // Instructions
        let instructions_title = self.style_manager.get_span("Getting Started:", StyleType::Subtitle);
        content.push(Line::from(vec![instructions_title]));

        let instructions = vec![
            "Use the number keys (1-4) to navigate between views:",
            "1 - Dashboard (current)",
            "2 - Data Browser",
            "3 - Settings",
            "4 - Help",
            "",
            "Press 'q' or Ctrl+C to quit.",
        ];

        for instruction in instructions {
            let instruction_span = self.style_manager.get_span(instruction, StyleType::Text);
            content.push(Line::from(vec![instruction_span]));
        }

        let paragraph = Paragraph::new(content)
            .block(block)
            .wrap(ratatui::widgets::Wrap { trim: true });

        f.render_widget(paragraph, area);
    }

    fn get_title(&self) -> &str {
        "Dashboard"
    }

    fn get_description(&self) -> &str {
        "Overview and quick actions"
    }
}

/// Data browser view
#[derive(Debug, Clone)]
pub struct DataBrowserView {
    style_manager: StyleManager,
}

impl DataBrowserView {
    pub fn new(style_manager: StyleManager) -> Self {
        Self { style_manager }
    }
}

impl View for DataBrowserView {
    fn render(&mut self, area: Rect, f: &mut Frame) {
        let content_style = self.style_manager.get_style(StyleType::Content);
        let block = Block::default()
            .style(content_style)
            .borders(Borders::ALL);

        let mut content = Vec::new();

        // Title
        let title_span = self.style_manager.get_span("📁 Data Browser", StyleType::Title);
        content.push(Line::from(vec![title_span]));
        content.push(Line::from(""));

        // Sample data table
        let table_title = self.style_manager.get_span("Sample Data Table:", StyleType::Subtitle);
        content.push(Line::from(vec![table_title]));
        content.push(Line::from(""));

        // Create table data
        let table_data = vec![
            ("001", "Project Alpha", "Active", "$1,234"),
            ("002", "Project Beta", "Pending", "$5,678"),
            ("003", "Project Gamma", "Completed", "$9,012"),
            ("004", "Project Delta", "Active", "$3,456"),
            ("005", "Project Epsilon", "Cancelled", "$0"),
        ];

        let header_style = self.style_manager.get_style(StyleType::Button);
        let header = Row::new(vec!["ID", "Name", "Status", "Value"])
            .style(header_style);

        let mut rows = Vec::new();
        for (id, name, status, value) in table_data {
            let status_style = match status {
                "Active" | "Completed" => self.style_manager.get_style(StyleType::Success),
                "Pending" => self.style_manager.get_style(StyleType::Warning),
                "Cancelled" => self.style_manager.get_style(StyleType::Error),
                _ => self.style_manager.get_style(StyleType::Text),
            };

            let row = Row::new(vec![id, name, status, value])
                .style(status_style);
            rows.push(row);
        }

        let table = Table::new(rows, [
            Constraint::Length(15),
            Constraint::Length(20),
            Constraint::Length(10),
            Constraint::Length(8),
        ])
            .header(header)
            .block(block);

        f.render_widget(table, area);
    }

    fn get_title(&self) -> &str {
        "Data Browser"
    }

    fn get_description(&self) -> &str {
        "Browse and manage data"
    }
}

/// Settings view
#[derive(Debug, Clone)]
pub struct SettingsView {
    style_manager: StyleManager,
}

impl SettingsView {
    pub fn new(style_manager: StyleManager) -> Self {
        Self { style_manager }
    }
}

impl View for SettingsView {
    fn render(&mut self, area: Rect, f: &mut Frame) {
        let content_style = self.style_manager.get_style(StyleType::Content);
        let block = Block::default()
            .style(content_style)
            .borders(Borders::ALL);

        let mut content = Vec::new();

        // Title
        let title_span = self.style_manager.get_span("⚙️ Settings", StyleType::Title);
        content.push(Line::from(vec![title_span]));
        content.push(Line::from(""));

        // Theme settings
        let theme_title = self.style_manager.get_span("Theme Settings:", StyleType::Subtitle);
        content.push(Line::from(vec![theme_title]));

        let theme_items = vec![
            "• Light Theme (current)",
            "• Dark Theme",
        ];

        for item in theme_items {
            let item_span = self.style_manager.get_span(item, StyleType::Text);
            content.push(Line::from(vec![item_span]));
        }

        content.push(Line::from(""));

        // Display settings
        let display_title = self.style_manager.get_span("Display Settings:", StyleType::Subtitle);
        content.push(Line::from(vec![display_title]));

        let display_items = vec![
            "• Show borders",
            "• Show status bar",
            "• Show navigation",
            "• Compact mode",
        ];

        for item in display_items {
            let item_span = self.style_manager.get_span(item, StyleType::Text);
            content.push(Line::from(vec![item_span]));
        }

        content.push(Line::from(""));

        // Application settings
        let app_title = self.style_manager.get_span("Application Settings:", StyleType::Subtitle);
        content.push(Line::from(vec![app_title]));

        let app_items = vec![
            "• Auto-save: Enabled",
            "• Notifications: Enabled",
            "• Debug mode: Disabled",
            "• Log level: Info",
        ];

        for item in app_items {
            let item_span = self.style_manager.get_span(item, StyleType::Text);
            content.push(Line::from(vec![item_span]));
        }

        content.push(Line::from(""));

        // Keyboard shortcuts
        let shortcuts_title = self.style_manager.get_span("Keyboard Shortcuts:", StyleType::Subtitle);
        content.push(Line::from(vec![shortcuts_title]));

        let shortcuts = vec![
            "• 1-4 - Navigate views",
            "• q - Quit application",
            "• Ctrl+C - Force quit",
            "• Tab - Focus next element",
            "• Enter - Activate/Confirm",
        ];

        for shortcut in shortcuts {
            let shortcut_span = self.style_manager.get_span(shortcut, StyleType::MutedText);
            content.push(Line::from(vec![shortcut_span]));
        }

        let paragraph = Paragraph::new(content)
            .block(block)
            .wrap(ratatui::widgets::Wrap { trim: true });

        f.render_widget(paragraph, area);
    }

    fn get_title(&self) -> &str {
        "Settings"
    }

    fn get_description(&self) -> &str {
        "Application configuration"
    }
}

/// Help view
#[derive(Debug, Clone)]
pub struct HelpView {
    style_manager: StyleManager,
}

impl HelpView {
    pub fn new(style_manager: StyleManager) -> Self {
        Self { style_manager }
    }
}

impl View for HelpView {
    fn render(&mut self, area: Rect, f: &mut Frame) {
        let content_style = self.style_manager.get_style(StyleType::Content);
        let block = Block::default()
            .style(content_style)
            .borders(Borders::ALL);

        let mut content = Vec::new();

        // Title
        let title_span = self.style_manager.get_span("❓ Help & Documentation", StyleType::Title);
        content.push(Line::from(vec![title_span]));
        content.push(Line::from(""));

        // About section
        let about_title = self.style_manager.get_span("About Ratatui TUI:", StyleType::Subtitle);
        content.push(Line::from(vec![about_title]));

        let about_text = vec![
            "This is a prototype Terminal User Interface built with Rust and Ratatui.",
            "It demonstrates modern TUI patterns and best practices.",
        ];

        for text in about_text {
            let text_span = self.style_manager.get_span(text, StyleType::Text);
            content.push(Line::from(vec![text_span]));
        }

        content.push(Line::from(""));

        // Navigation help
        let nav_title = self.style_manager.get_span("Navigation:", StyleType::Subtitle);
        content.push(Line::from(vec![nav_title]));

        let nav_items = vec![
            "• 1 - Dashboard: Overview and quick actions",
            "• 2 - Data Browser: View and manage data",
            "• 3 - Settings: Configure application",
            "• 4 - Help: This documentation",
        ];

        for item in nav_items {
            let item_span = self.style_manager.get_span(item, StyleType::Text);
            content.push(Line::from(vec![item_span]));
        }

        content.push(Line::from(""));

        // Keyboard shortcuts
        let shortcuts_title = self.style_manager.get_span("Keyboard Shortcuts:", StyleType::Subtitle);
        content.push(Line::from(vec![shortcuts_title]));

        let shortcuts = vec![
            "• q or Ctrl+C - Quit application",
            "• 1-4 - Switch between views",
            "• Tab - Focus next element",
            "• Enter - Activate/Confirm",
            "• Escape - Cancel/Go back",
        ];

        for shortcut in shortcuts {
            let shortcut_span = self.style_manager.get_span(shortcut, StyleType::MutedText);
            content.push(Line::from(vec![shortcut_span]));
        }

        content.push(Line::from(""));

        // Features
        let features_title = self.style_manager.get_span("Features:", StyleType::Subtitle);
        content.push(Line::from(vec![features_title]));

        let features = vec![
            "• Responsive design",
            "• Modern styling",
            "• Keyboard navigation",
            "• Multiple views",
            "• Component-based architecture",
        ];

        for feature in features {
            let feature_span = self.style_manager.get_span(feature, StyleType::Text);
            content.push(Line::from(vec![feature_span]));
        }

        content.push(Line::from(""));

        // Tips
        let tips_title = self.style_manager.get_span("Tips:", StyleType::Subtitle);
        content.push(Line::from(vec![tips_title]));

        let tips = vec![
            "• Resize your terminal window to see responsive design",
            "• Use number keys for quick navigation",
            "• Check the status bar for current view information",
        ];

        for tip in tips {
            let tip_span = self.style_manager.get_span(tip, StyleType::Text);
            content.push(Line::from(vec![tip_span]));
        }

        let paragraph = Paragraph::new(content)
            .block(block)
            .wrap(ratatui::widgets::Wrap { trim: true });

        f.render_widget(paragraph, area);
    }

    fn get_title(&self) -> &str {
        "Help"
    }

    fn get_description(&self) -> &str {
        "Documentation and help"
    }
}

/// View manager for handling all views
#[derive(Debug, Clone)]
pub struct ViewManager {
    pub dashboard: DashboardView,
    pub data_browser: DataBrowserView,
    pub settings: SettingsView,
    pub help: HelpView,
}

impl ViewManager {
    pub fn new(style_manager: StyleManager) -> Self {
        Self {
            dashboard: DashboardView::new(style_manager.clone()),
            data_browser: DataBrowserView::new(style_manager.clone()),
            settings: SettingsView::new(style_manager.clone()),
            help: HelpView::new(style_manager),
        }
    }

    pub fn get_view(&mut self, view_name: &str) -> &mut dyn View {
        match view_name {
            "dashboard" => &mut self.dashboard,
            "data" => &mut self.data_browser,
            "settings" => &mut self.settings,
            "help" => &mut self.help,
            _ => &mut self.dashboard,
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::styles::StyleManager;

    #[test]
    fn test_dashboard_view_creation() {
        let style_manager = StyleManager::default();
        let dashboard = DashboardView::new(style_manager);
        assert_eq!(dashboard.get_title(), "Dashboard");
        assert_eq!(dashboard.get_description(), "Overview and quick actions");
    }

    #[test]
    fn test_data_browser_view_creation() {
        let style_manager = StyleManager::default();
        let data_browser = DataBrowserView::new(style_manager);
        assert_eq!(data_browser.get_title(), "Data Browser");
        assert_eq!(data_browser.get_description(), "Browse and manage data");
    }

    #[test]
    fn test_settings_view_creation() {
        let style_manager = StyleManager::default();
        let settings = SettingsView::new(style_manager);
        assert_eq!(settings.get_title(), "Settings");
        assert_eq!(settings.get_description(), "Application configuration");
    }

    #[test]
    fn test_help_view_creation() {
        let style_manager = StyleManager::default();
        let help = HelpView::new(style_manager);
        assert_eq!(help.get_title(), "Help");
        assert_eq!(help.get_description(), "Documentation and help");
    }

    #[test]
    fn test_view_manager_creation() {
        let style_manager = StyleManager::default();
        let view_manager = ViewManager::new(style_manager);
        assert_eq!(view_manager.dashboard.get_title(), "Dashboard");
        assert_eq!(view_manager.data_browser.get_title(), "Data Browser");
        assert_eq!(view_manager.settings.get_title(), "Settings");
        assert_eq!(view_manager.help.get_title(), "Help");
    }
}
