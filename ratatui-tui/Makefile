# Ratatui TUI Makefile

# Variables
BINARY_NAME=ratatui-tui
TARGET_DIR=target
RELEASE_DIR=$(TARGET_DIR)/release
DEBUG_DIR=$(TARGET_DIR)/debug

# Colors for output
RED=\033[0;31m
GREEN=\033[0;32m
YELLOW=\033[0;33m
BLUE=\033[0;34m
NC=\033[0m # No Color

.PHONY: help build run test clean deps fmt lint install dev bench

# Default target
help: ## Show this help message
	@echo "$(BLUE)Ratatui TUI - Available Commands$(NC)"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "$(GREEN)%-15s$(NC) %s\n", $$1, $$2}'

build: ## Build the application in debug mode
	@echo "$(BLUE)Building $(BINARY_NAME) in debug mode...$(NC)"
	@cargo build
	@echo "$(GREEN)Build complete! Binary: $(DEBUG_DIR)/$(BINARY_NAME)$(NC)"

build-release: ## Build the application in release mode
	@echo "$(BLUE)Building $(BINARY_NAME) in release mode...$(NC)"
	@cargo build --release
	@echo "$(GREEN)Release build complete! Binary: $(RELEASE_DIR)/$(BINARY_NAME)$(NC)"

run: ## Run the application
	@echo "$(BLUE)Running $(BINARY_NAME)...$(NC)"
	@cargo run

run-release: ## Run the release version
	@echo "$(BLUE)Running $(BINARY_NAME) (release)...$(NC)"
	@cargo run --release

dev: ## Run in development mode with auto-reload (requires cargo-watch)
	@echo "$(BLUE)Starting development server...$(NC)"
	@if command -v cargo-watch > /dev/null; then \
		cargo watch -x run; \
	else \
		echo "$(YELLOW)cargo-watch not found. Installing...$(NC)"; \
		cargo install cargo-watch; \
		cargo watch -x run; \
	fi

test: ## Run tests
	@echo "$(BLUE)Running tests...$(NC)"
	@cargo test

test-verbose: ## Run tests with verbose output
	@echo "$(BLUE)Running tests with verbose output...$(NC)"
	@cargo test -- --nocapture

test-coverage: ## Run tests with coverage (requires cargo-tarpaulin)
	@echo "$(BLUE)Running tests with coverage...$(NC)"
	@if command -v cargo-tarpaulin > /dev/null; then \
		cargo tarpaulin --out Html; \
		echo "$(GREEN)Coverage report generated: tarpaulin-report.html$(NC)"; \
	else \
		echo "$(YELLOW)cargo-tarpaulin not found. Installing...$(NC)"; \
		cargo install cargo-tarpaulin; \
		cargo tarpaulin --out Html; \
		echo "$(GREEN)Coverage report generated: tarpaulin-report.html$(NC)"; \
	fi

bench: ## Run benchmarks
	@echo "$(BLUE)Running benchmarks...$(NC)"
	@cargo bench

fmt: ## Format code
	@echo "$(BLUE)Formatting code...$(NC)"
	@cargo fmt

fmt-check: ## Check code formatting
	@echo "$(BLUE)Checking code formatting...$(NC)"
	@cargo fmt -- --check

lint: ## Run linter
	@echo "$(BLUE)Running linter...$(NC)"
	@cargo clippy -- -D warnings

lint-fix: ## Run linter and fix issues
	@echo "$(BLUE)Running linter and fixing issues...$(NC)"
	@cargo clippy --fix --allow-dirty --allow-staged

deps: ## Download dependencies
	@echo "$(BLUE)Downloading dependencies...$(NC)"
	@cargo fetch

update: ## Update dependencies
	@echo "$(BLUE)Updating dependencies...$(NC)"
	@cargo update

install: ## Install the binary to cargo bin
	@echo "$(BLUE)Installing $(BINARY_NAME)...$(NC)"
	@cargo install --path .
	@echo "$(GREEN)Installed to $(HOME)/.cargo/bin/$(BINARY_NAME)$(NC)"

clean: ## Clean build artifacts
	@echo "$(BLUE)Cleaning build artifacts...$(NC)"
	@cargo clean
	@rm -f tarpaulin-report.html
	@echo "$(GREEN)Clean complete!$(NC)"

check: ## Check code without building
	@echo "$(BLUE)Checking code...$(NC)"
	@cargo check

check-all: ## Check code for all targets
	@echo "$(BLUE)Checking code for all targets...$(NC)"
	@cargo check --all-targets

doc: ## Generate documentation
	@echo "$(BLUE)Generating documentation...$(NC)"
	@cargo doc --open

doc-test: ## Run documentation tests
	@echo "$(BLUE)Running documentation tests...$(NC)"
	@cargo test --doc

# Development tools
install-tools: ## Install development tools
	@echo "$(BLUE)Installing development tools...$(NC)"
	@cargo install cargo-watch cargo-tarpaulin cargo-audit cargo-outdated
	@echo "$(GREEN)Development tools installed!$(NC)"

audit: ## Run security audit
	@echo "$(BLUE)Running security audit...$(NC)"
	@if command -v cargo-audit > /dev/null; then \
		cargo audit; \
	else \
		echo "$(YELLOW)cargo-audit not found. Installing...$(NC)"; \
		cargo install cargo-audit; \
		cargo audit; \
	fi

outdated: ## Check for outdated dependencies
	@echo "$(BLUE)Checking for outdated dependencies...$(NC)"
	@if command -v cargo-outdated > /dev/null; then \
		cargo outdated; \
	else \
		echo "$(YELLOW)cargo-outdated not found. Installing...$(NC)"; \
		cargo install cargo-outdated; \
		cargo outdated; \
	fi

# Quick development workflow
quick: fmt lint test build ## Quick development workflow (format, lint, test, build)

# All-in-one setup for new developers
setup: deps install-tools ## Setup development environment
	@echo "$(GREEN)Development environment setup complete!$(NC)"
	@echo "$(YELLOW)Run 'make run' to start the application$(NC)"

# Release workflow
release: clean test lint build-release ## Full release workflow
	@echo "$(GREEN)Release build complete!$(NC)"
	@echo "$(YELLOW)Binary available at: $(RELEASE_DIR)/$(BINARY_NAME)$(NC)"

# Docker support (optional)
docker-build: ## Build Docker image
	@echo "$(BLUE)Building Docker image...$(NC)"
	@docker build -t $(BINARY_NAME) .
	@echo "$(GREEN)Docker image built: $(BINARY_NAME)$(NC)"

docker-run: ## Run in Docker container
	@echo "$(BLUE)Running in Docker...$(NC)"
	@docker run -it --rm $(BINARY_NAME)

# Cross-compilation (optional)
cross-build: ## Build for multiple platforms (requires cross)
	@echo "$(BLUE)Building for multiple platforms...$(NC)"
	@if command -v cross > /dev/null; then \
		cross build --release --target x86_64-unknown-linux-gnu; \
		cross build --release --target x86_64-pc-windows-gnu; \
		cross build --release --target aarch64-apple-darwin; \
		echo "$(GREEN)Cross-compilation complete!$(NC)"; \
	else \
		echo "$(YELLOW)cross not found. Install with: cargo install cross$(NC)"; \
	fi
