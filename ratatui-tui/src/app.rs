use anyhow::Result;
use crossterm::{
    event::{self, DisableMouseCapture, EnableMouseCapture, Event, KeyCode, KeyEventKind},
    execute,
    terminal::{disable_raw_mode, enable_raw_mode, EnterAlternateScreen, LeaveAlternateScreen},
};
use ratatui::{
    backend::{Backend, CrosstermBackend},
    layout::{Constraint, Direction, Layout, Rect},
    Terminal,
};
use std::io;

use crate::{
    styles::StyleManager,
    views::ViewManager,
    widgets::WidgetManager,
};

/// Application state
#[derive(Debug, Clone, PartialEq)]
pub enum View {
    Dashboard,
    Data,
    Settings,
    Help,
}

impl View {
    pub fn as_str(&self) -> &'static str {
        match self {
            View::Dashboard => "dashboard",
            View::Data => "data",
            View::Settings => "settings",
            View::Help => "help",
        }
    }
}

/// Main application structure
#[derive(Debug, Clone)]
pub struct App {
    pub current_view: View,
    pub should_quit: bool,
    pub style_manager: StyleManager,
    pub widget_manager: WidgetManager,
    pub view_manager: ViewManager,
}

impl App {
    /// Create a new application instance
    pub fn new() -> Self {
        let style_manager = StyleManager::default();
        let widget_manager = WidgetManager::new(style_manager.clone());
        let view_manager = ViewManager::new(style_manager.clone());

        Self {
            current_view: View::Dashboard,
            should_quit: false,
            style_manager,
            widget_manager,
            view_manager,
        }
    }

    /// Run the application
    pub async fn run<B: Backend>(&mut self, terminal: &mut Terminal<B>) -> Result<()> {
        loop {
            terminal.draw(|f| self.render(f))?;

            if let Event::Key(key) = event::read()? {
                if key.kind == KeyEventKind::Press {
                    if self.handle_key_event(key.code) {
                        break;
                    }
                }
            }
        }

        Ok(())
    }

    /// Handle key events
    fn handle_key_event(&mut self, key: KeyCode) -> bool {
        match key {
            KeyCode::Char('q') | KeyCode::Esc => {
                self.should_quit = true;
                true
            }
            KeyCode::Char('1') => {
                self.current_view = View::Dashboard;
                self.update_widgets();
                false
            }
            KeyCode::Char('2') => {
                self.current_view = View::Data;
                self.update_widgets();
                false
            }
            KeyCode::Char('3') => {
                self.current_view = View::Settings;
                self.update_widgets();
                false
            }
            KeyCode::Char('4') => {
                self.current_view = View::Help;
                self.update_widgets();
                false
            }
            KeyCode::Char('t') => {
                self.style_manager.toggle_theme();
                self.update_widgets();
                false
            }
            _ => false,
        }
    }

    /// Update widgets with current state
    fn update_widgets(&mut self) {
        // Update sidebar with current view
        self.widget_manager
            .sidebar
            .set_current_view(self.current_view.as_str().to_string());

        // Update status bar
        let status_text = format!(
            "View: {} | Press 'q' to quit | 1-4 for navigation | 't' to toggle theme",
            self.current_view.as_str()
        );
        self.widget_manager.status_bar.set_status(status_text);

        // Update content with current view
        let view_content = self.get_current_view_content();
        self.widget_manager.content.set_content(view_content);
    }

    /// Get content for the current view
    fn get_current_view_content(&self) -> String {
        match self.current_view {
            View::Dashboard => "Dashboard content loaded...".to_string(),
            View::Data => "Data browser content loaded...".to_string(),
            View::Settings => "Settings content loaded...".to_string(),
            View::Help => "Help content loaded...".to_string(),
        }
    }

    /// Render the application
    fn render(&mut self, f: &mut ratatui::Frame) {
        let size = f.size();
        self.widget_manager.render_all(f, size);
    }
}

/// Setup terminal for the application
pub fn setup_terminal() -> Result<Terminal<CrosstermBackend<io::Stdout>>> {
    enable_raw_mode()?;
    let mut stdout = io::stdout();
    execute!(stdout, EnterAlternateScreen, EnableMouseCapture)?;
    let backend = CrosstermBackend::new(stdout);
    let terminal = Terminal::new(backend)?;
    Ok(terminal)
}

/// Restore terminal to normal state
pub fn restore_terminal(terminal: &mut Terminal<CrosstermBackend<io::Stdout>>) -> Result<()> {
    disable_raw_mode()?;
    execute!(
        terminal.backend_mut(),
        LeaveAlternateScreen,
        DisableMouseCapture
    )?;
    terminal.show_cursor()?;
    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_app_creation() {
        let app = App::new();
        assert_eq!(app.current_view, View::Dashboard);
        assert!(!app.should_quit);
    }

    #[test]
    fn test_view_as_str() {
        assert_eq!(View::Dashboard.as_str(), "dashboard");
        assert_eq!(View::Data.as_str(), "data");
        assert_eq!(View::Settings.as_str(), "settings");
        assert_eq!(View::Help.as_str(), "help");
    }

    #[test]
    fn test_view_equality() {
        assert_eq!(View::Dashboard, View::Dashboard);
        assert_ne!(View::Dashboard, View::Data);
    }

    #[test]
    fn test_get_current_view_content() {
        let app = App::new();

        let dashboard_content = match View::Dashboard {
            View::Dashboard => "Dashboard content loaded...".to_string(),
            _ => "".to_string(),
        };
        assert_eq!(dashboard_content, "Dashboard content loaded...");
    }
}
