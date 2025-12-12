.PHONY: help install setup start dev server client build test clean mongo-start mongo-stop

help: ## Show this help message
	@echo "CommunityHub - Available Commands:"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

install: ## Install all dependencies (backend + frontend)
	@echo "📦 Installing backend dependencies..."
	@npm install
	@echo "📦 Installing frontend dependencies..."
	@cd client && npm install
	@echo "✅ All dependencies installed!"

setup: install ## Complete setup (install + create .env)
	@if [ ! -f .env ]; then \
		echo "📝 Creating .env file..."; \
		cp .env.example .env; \
		echo "✅ .env created"; \
	else \
		echo "✅ .env already exists"; \
	fi

start: dev ## Start the application (alias for dev)

dev: ## Start both frontend and backend servers
	@echo "🚀 Starting CommunityHub..."
	@echo "   Frontend: http://localhost:3000"
	@echo "   Backend:  http://localhost:5000"
	@npm run dev

server: ## Start backend server only
	@npm run server

client: ## Start frontend client only
	@npm run client

build: ## Build frontend for production
	@npm run build

test: ## Run tests
	@npm test

clean: ## Remove node_modules and clean install
	@echo "🧹 Cleaning up..."
	@rm -rf node_modules client/node_modules
	@echo "✅ Cleaned!"

mongo-start: ## Start MongoDB (macOS with Homebrew)
	@echo "🍃 Starting MongoDB..."
	@brew services start mongodb-community || echo "Please install MongoDB: brew install mongodb-community"

mongo-stop: ## Stop MongoDB
	@echo "🛑 Stopping MongoDB..."
	@brew services stop mongodb-community

all: setup mongo-start dev ## Complete setup and start everything
