use ratatui::{
    layout::{Constraint, Direction, Layout, Rect},
    style::Style,
    text::{Line, Span},
    widgets::{Block, Borders, List, ListItem, Paragraph},
    Frame,
};

use crate::styles::{StyleManager, StyleType};

/// Trait for all widgets in the application
pub trait Widget {
    /// Render the widget to the given area
    fn render(&mut self, area: Rect, f: &mut Frame);

    /// Handle events for the widget
    fn handle_event(&mut self, event: crossterm::event::Event) -> bool {
        false // Default implementation does nothing
    }
}

/// Header widget for the application
#[derive(Debug, Clone)]
pub struct HeaderWidget {
    title: String,
    style_manager: StyleManager,
}

impl HeaderWidget {
    pub fn new(title: String, style_manager: StyleManager) -> Self {
        Self {
            title,
            style_manager,
        }
    }
}

impl Widget for HeaderWidget {
    fn render(&mut self, area: Rect, f: &mut Frame) {
        let header_style = self.style_manager.get_style(StyleType::Header);
        let block = Block::default()
            .title(self.title.as_str())
            .style(header_style)
            .borders(Borders::ALL);

        f.render_widget(block, area);
    }
}

/// Sidebar widget for navigation
#[derive(Debug, Clone)]
pub struct SidebarWidget {
    items: Vec<SidebarItem>,
    current_view: String,
    style_manager: StyleManager,
}

#[derive(Debug, Clone)]
pub struct SidebarItem {
    pub id: String,
    pub label: String,
    pub key: String,
}

impl SidebarWidget {
    pub fn new(style_manager: StyleManager) -> Self {
        Self {
            items: vec![
                SidebarItem {
                    id: "dashboard".to_string(),
                    label: "📊 Dashboard".to_string(),
                    key: "1".to_string(),
                },
                SidebarItem {
                    id: "data".to_string(),
                    label: "📁 Data Browser".to_string(),
                    key: "2".to_string(),
                },
                SidebarItem {
                    id: "settings".to_string(),
                    label: "⚙️ Settings".to_string(),
                    key: "3".to_string(),
                },
                SidebarItem {
                    id: "help".to_string(),
                    label: "❓ Help".to_string(),
                    key: "4".to_string(),
                },
            ],
            current_view: "dashboard".to_string(),
            style_manager,
        }
    }

    pub fn set_current_view(&mut self, view: String) {
        self.current_view = view;
    }
}

impl Widget for SidebarWidget {
    fn render(&mut self, area: Rect, f: &mut Frame) {
        let sidebar_style = self.style_manager.get_style(StyleType::Sidebar);

        // Create navigation items
        let mut list_items = Vec::new();

        // Add title
        let title_span = Span::styled("Navigation", self.style_manager.get_style(StyleType::Subtitle));
        list_items.push(ListItem::new(Line::from(vec![title_span])));
        list_items.push(ListItem::new("")); // Empty line

        // Add navigation items
        for item in &self.items {
            let is_active = item.id == self.current_view;
            let style_type = if is_active {
                StyleType::ButtonActive
            } else {
                StyleType::Button
            };

            let item_text = format!("{} {}", item.key, item.label);
            let item_span = Span::styled(item_text, self.style_manager.get_style(style_type));
            list_items.push(ListItem::new(Line::from(vec![item_span])));
        }

        // Add separator
        list_items.push(ListItem::new(""));
        list_items.push(ListItem::new("─".repeat(area.width as usize - 4)));
        list_items.push(ListItem::new(""));

        // Add shortcuts
        let shortcuts_title = Span::styled("Shortcuts:", self.style_manager.get_style(StyleType::MutedText));
        list_items.push(ListItem::new(Line::from(vec![shortcuts_title])));

        let shortcuts = vec![
            "q - Quit",
            "1-4 - Navigate",
            "Ctrl+C - Quit",
        ];

        for shortcut in shortcuts {
            let shortcut_span = Span::styled(shortcut, self.style_manager.get_style(StyleType::MutedText));
            list_items.push(ListItem::new(Line::from(vec![shortcut_span])));
        }

        let list = List::new(list_items)
            .block(Block::default().style(sidebar_style).borders(Borders::ALL));

        f.render_widget(list, area);
    }
}

/// Content widget for the main content area
#[derive(Debug, Clone)]
pub struct ContentWidget {
    content: String,
    style_manager: StyleManager,
}

impl ContentWidget {
    pub fn new(style_manager: StyleManager) -> Self {
        Self {
            content: String::new(),
            style_manager,
        }
    }

    pub fn set_content(&mut self, content: String) {
        self.content = content;
    }
}

impl Widget for ContentWidget {
    fn render(&mut self, area: Rect, f: &mut Frame) {
        let content_style = self.style_manager.get_style(StyleType::Content);
        let block = Block::default()
            .style(content_style)
            .borders(Borders::ALL);

        let paragraph = Paragraph::new(self.content.as_str())
            .block(block)
            .wrap(ratatui::widgets::Wrap { trim: true });

        f.render_widget(paragraph, area);
    }
}

/// Status bar widget
#[derive(Debug, Clone)]
pub struct StatusBarWidget {
    status_text: String,
    style_manager: StyleManager,
}

impl StatusBarWidget {
    pub fn new(style_manager: StyleManager) -> Self {
        Self {
            status_text: String::new(),
            style_manager,
        }
    }

    pub fn set_status(&mut self, status: String) {
        self.status_text = status;
    }
}

impl Widget for StatusBarWidget {
    fn render(&mut self, area: Rect, f: &mut Frame) {
        let status_style = self.style_manager.get_style(StyleType::StatusBar);
        let block = Block::default()
            .style(status_style)
            .borders(Borders::ALL);

        let paragraph = Paragraph::new(self.status_text.as_str())
            .block(block)
            .alignment(ratatui::layout::Alignment::Center);

        f.render_widget(paragraph, area);
    }
}

/// Widget manager for handling all widgets
#[derive(Debug, Clone)]
pub struct WidgetManager {
    pub header: HeaderWidget,
    pub sidebar: SidebarWidget,
    pub content: ContentWidget,
    pub status_bar: StatusBarWidget,
}

impl WidgetManager {
    pub fn new(style_manager: StyleManager) -> Self {
        Self {
            header: HeaderWidget::new("Ratatui TUI".to_string(), style_manager.clone()),
            sidebar: SidebarWidget::new(style_manager.clone()),
            content: ContentWidget::new(style_manager.clone()),
            status_bar: StatusBarWidget::new(style_manager),
        }
    }

    pub fn render_all(&mut self, f: &mut Frame, area: Rect) {
        let chunks = Layout::default()
            .direction(Direction::Vertical)
            .constraints([
                Constraint::Length(3), // Header
                Constraint::Min(0),    // Main content
                Constraint::Length(1), // Status bar
            ])
            .split(area);

        // Render header
        self.header.render(chunks[0], f);

        // Render main content area
        let main_chunks = Layout::default()
            .direction(Direction::Horizontal)
            .constraints([
                Constraint::Length(20), // Sidebar
                Constraint::Min(0),     // Content
            ])
            .split(chunks[1]);

        // Render sidebar
        self.sidebar.render(main_chunks[0], f);

        // Render content
        self.content.render(main_chunks[1], f);

        // Render status bar
        self.status_bar.render(chunks[2], f);
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::styles::StyleManager;

    #[test]
    fn test_header_widget_creation() {
        let style_manager = StyleManager::default();
        let header = HeaderWidget::new("Test".to_string(), style_manager);
        assert_eq!(header.title, "Test");
    }

    #[test]
    fn test_sidebar_widget_creation() {
        let style_manager = StyleManager::default();
        let sidebar = SidebarWidget::new(style_manager);
        assert_eq!(sidebar.items.len(), 4);
        assert_eq!(sidebar.current_view, "dashboard");
    }

    #[test]
    fn test_content_widget_creation() {
        let style_manager = StyleManager::default();
        let content = ContentWidget::new(style_manager);
        assert_eq!(content.content, "");
    }

    #[test]
    fn test_status_bar_widget_creation() {
        let style_manager = StyleManager::default();
        let status_bar = StatusBarWidget::new(style_manager);
        assert_eq!(status_bar.status_text, "");
    }

    #[test]
    fn test_widget_manager_creation() {
        let style_manager = StyleManager::default();
        let widget_manager = WidgetManager::new(style_manager);
        assert_eq!(widget_manager.header.title, "Ratatui TUI");
    }
}
