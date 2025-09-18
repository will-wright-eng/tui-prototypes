#* Setup
.PHONY: $(shell sed -n -e '/^$$/ { n ; /^[^ .\#][^ ]*:/ { s/:.*$$// ; p ; } ; }' $(MAKEFILE_LIST))
.DEFAULT_GOAL := help

# Default target
help: ## Show this help message
	@echo "$(BLUE)Ratatui TUI - Available Commands$(NC)"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "$(GREEN)%-15s$(NC) %s\n", $$1, $$2}'

clean: ## run makefile commands to clean directories
	cd bubble-tea-tui && make clean
	cd javascript-tui && make clean
	cd ratatui-tui && make clean
