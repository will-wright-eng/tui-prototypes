use anyhow::Result;
use log::info;

mod app;
mod styles;
mod views;
mod widgets;

use app::{restore_terminal, setup_terminal, App};

#[tokio::main]
async fn main() -> Result<()> {
    // Initialize logging
    env_logger::Builder::from_default_env()
        .filter_level(log::LevelFilter::Info)
        .init();

    info!("Starting Ratatui TUI application");

    // Setup terminal
    let mut terminal = setup_terminal()?;
    info!("Terminal setup complete");

    // Create and run application
    let mut app = App::new();
    info!("Application created, starting main loop");

    // Run the application
    let result = app.run(&mut terminal).await;

    // Restore terminal
    restore_terminal(&mut terminal)?;
    info!("Terminal restored");

    // Handle result
    match result {
        Ok(_) => {
            info!("Application exited successfully");
            Ok(())
        }
        Err(e) => {
            eprintln!("Application error: {}", e);
            Err(e)
        }
    }
}
