#!/bin/bash
echo "Setting up BrandForge AI..."

# Check if venv exists
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
echo "Activating virtual environment..."
source venv/bin/activate

# Install dependencies if not already installed
if ! python3 -c "import agno" &> /dev/null; then
    echo "Installing dependencies..."
    pip install -e ".[dev]"
fi

# Create .env if it doesn't exist
if [ ! -f ".env" ]; then
    echo "Creating .env from .env.example..."
    cp .env.example .env
    echo "Please add your GEMINI_API_KEY to .env and run this script again."
    exit 1
fi

echo "Starting BrandForge AI Server..."
echo "You can access the API docs at: http://localhost:8000/docs"
python -m uvicorn brandforge.api.app:app --reload --port 8000
