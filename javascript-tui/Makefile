# JavaScript TUI Makefile

#* Setup
.PHONY: $(shell sed -n -e '/^$$/ { n ; /^[^ .\#][^ ]*:/ { s/:.*$$// ; p ; } ; }' $(MAKEFILE_LIST))
.DEFAULT_GOAL := help

help: ## list make commands
	@echo ${MAKEFILE_LIST}
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

install: ## Install dependencies
	npm install

dev: ## Run in development mode
	npm run dev

start: ## Run the application
	npm start

test: ## Run tests
	npm test

test-watch: ## Run tests in watch mode
	npm run test:watch

test-cov: ## Run tests with coverage
	npm run test:coverage

lint: ## Lint code
	npm run lint

lint-fix: ## Fix linting issues
	npm run lint:fix

format: ## Format code
	npm run format

clean: ## Clean dependencies
	npm run clean

build: ## Build (no-op for Node.js)
	npm run build

setup: install ## Setup development environment
	@echo "Development environment setup complete!"
	@echo "Run 'make dev' to start development mode"
	@echo "Run 'make start' to run the application"
