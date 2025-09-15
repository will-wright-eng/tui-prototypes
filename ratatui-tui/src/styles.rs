use ratatui::{
    style::{Color, Modifier, Style},
    text::Span,
};

/// Theme configuration for the application
#[derive(Debug, Clone, PartialEq)]
pub struct Theme {
    pub background: Color,
    pub foreground: Color,
    pub primary: Color,
    pub secondary: Color,
    pub success: Color,
    pub warning: Color,
    pub error: Color,
    pub info: Color,
}

impl Default for Theme {
    fn default() -> Self {
        Self::light()
    }
}

impl Theme {
    /// Create a light theme
    pub fn light() -> Self {
        Self {
            background: Color::Rgb(255, 255, 255),
            foreground: Color::Rgb(0, 0, 0),
            primary: Color::Rgb(0, 122, 204),
            secondary: Color::Rgb(108, 117, 125),
            success: Color::Rgb(40, 167, 69),
            warning: Color::Rgb(255, 193, 7),
            error: Color::Rgb(220, 53, 69),
            info: Color::Rgb(23, 162, 184),
        }
    }

    /// Create a dark theme
    pub fn dark() -> Self {
        Self {
            background: Color::Rgb(30, 30, 30),
            foreground: Color::Rgb(255, 255, 255),
            primary: Color::Rgb(0, 122, 204),
            secondary: Color::Rgb(108, 117, 125),
            success: Color::Rgb(40, 167, 69),
            warning: Color::Rgb(255, 193, 7),
            error: Color::Rgb(220, 53, 69),
            info: Color::Rgb(23, 162, 184),
        }
    }
}

/// Style types for different UI elements
#[derive(Debug, Clone, PartialEq)]
pub enum StyleType {
    Header,
    Sidebar,
    Content,
    StatusBar,
    Button,
    ButtonActive,
    Input,
    InputFocus,
    Title,
    Subtitle,
    Text,
    MutedText,
    Error,
    Success,
    Warning,
    Info,
    Border,
    BorderFocus,
}

/// Style manager for the application
#[derive(Debug, Clone)]
pub struct StyleManager {
    theme: Theme,
}

impl Default for StyleManager {
    fn default() -> Self {
        Self::new(Theme::default())
    }
}

impl StyleManager {
    /// Create a new style manager with the given theme
    pub fn new(theme: Theme) -> Self {
        Self { theme }
    }

    /// Get a style for the given style type
    pub fn get_style(&self, style_type: StyleType) -> Style {
        match style_type {
            StyleType::Header => Style::default()
                .fg(self.theme.foreground)
                .bg(self.theme.primary)
                .add_modifier(Modifier::BOLD),
            StyleType::Sidebar => Style::default()
                .fg(self.theme.foreground)
                .bg(self.theme.secondary),
            StyleType::Content => Style::default()
                .fg(self.theme.foreground)
                .bg(self.theme.background),
            StyleType::StatusBar => Style::default()
                .fg(self.theme.secondary)
                .bg(self.theme.background),
            StyleType::Button => Style::default()
                .fg(self.theme.foreground)
                .bg(self.theme.primary),
            StyleType::ButtonActive => Style::default()
                .fg(self.theme.background)
                .bg(self.theme.primary)
                .add_modifier(Modifier::BOLD),
            StyleType::Input => Style::default()
                .fg(self.theme.foreground)
                .bg(self.theme.background),
            StyleType::InputFocus => Style::default()
                .fg(self.theme.foreground)
                .bg(self.theme.background)
                .add_modifier(Modifier::BOLD),
            StyleType::Title => Style::default()
                .fg(self.theme.primary)
                .add_modifier(Modifier::BOLD),
            StyleType::Subtitle => Style::default()
                .fg(self.theme.secondary)
                .add_modifier(Modifier::BOLD),
            StyleType::Text => Style::default()
                .fg(self.theme.foreground),
            StyleType::MutedText => Style::default()
                .fg(self.theme.secondary),
            StyleType::Error => Style::default()
                .fg(self.theme.error)
                .add_modifier(Modifier::BOLD),
            StyleType::Success => Style::default()
                .fg(self.theme.success)
                .add_modifier(Modifier::BOLD),
            StyleType::Warning => Style::default()
                .fg(self.theme.warning)
                .add_modifier(Modifier::BOLD),
            StyleType::Info => Style::default()
                .fg(self.theme.info)
                .add_modifier(Modifier::BOLD),
            StyleType::Border => Style::default()
                .fg(self.theme.secondary),
            StyleType::BorderFocus => Style::default()
                .fg(self.theme.primary),
        }
    }

    /// Get a span with the given style
    pub fn get_span<'a>(&self, text: &'a str, style_type: StyleType) -> Span<'a> {
        Span::styled(text, self.get_style(style_type))
    }

    /// Get the current theme
    pub fn theme(&self) -> &Theme {
        &self.theme
    }

    /// Set a new theme
    pub fn set_theme(&mut self, theme: Theme) {
        self.theme = theme;
    }

    /// Toggle between light and dark theme
    pub fn toggle_theme(&mut self) {
        self.theme = if self.theme == Theme::light() {
            Theme::dark()
        } else {
            Theme::light()
        };
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_theme_creation() {
        let light_theme = Theme::light();
        let dark_theme = Theme::dark();

        assert_ne!(light_theme.background, dark_theme.background);
        assert_ne!(light_theme.foreground, dark_theme.foreground);
        assert_eq!(light_theme.primary, dark_theme.primary);
    }

    #[test]
    fn test_style_manager() {
        let style_manager = StyleManager::default();
        let header_style = style_manager.get_style(StyleType::Header);
        let content_style = style_manager.get_style(StyleType::Content);

        assert_ne!(header_style, content_style);
    }

    #[test]
    fn test_span_creation() {
        let style_manager = StyleManager::default();
        let span = style_manager.get_span("Test", StyleType::Title);

        assert_eq!(span.content, "Test");
    }

    #[test]
    fn test_theme_toggle() {
        let mut style_manager = StyleManager::new(Theme::light());
        assert_eq!(style_manager.theme(), &Theme::light());

        style_manager.toggle_theme();
        assert_eq!(style_manager.theme(), &Theme::dark());

        style_manager.toggle_theme();
        assert_eq!(style_manager.theme(), &Theme::light());
    }
}
