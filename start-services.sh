#!/bin/bash

# PayNest ML Integration Quick Start
# Starts all three services: ML API, Express Backend, React Frontend

set -e

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "🚀 PayNest ML Integration Startup"
echo "=================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check for required services
check_port() {
    if lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null 2>&1 ; then
        return 0
    else
        return 1
    fi
}

# Kill process on port
killport() {
  lsof -ti:$1 | xargs kill -9 2>/dev/null || true
}

echo -e "${BLUE}Step 1: Checking environment...${NC}"
echo ""

# Check Python
if ! command -v python &> /dev/null; then
    echo -e "${RED}❌ Python not found. Please install Python 3.8+${NC}"
    exit 1
fi
echo -e "${GREEN}✓${NC} Python: $(python --version)"

# Check Node
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js not found. Please install Node.js${NC}"
    exit 1
fi
echo -e "${GREEN}✓${NC} Node: $(node --version)"

# Check npm
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm not found. Please install npm${NC}"
    exit 1
fi
echo -e "${GREEN}✓${NC} npm: $(npm --version)"

echo ""
echo -e "${BLUE}Step 2: Installing dependencies${NC}"
echo ""

if [ ! -d "node_modules" ]; then
    echo "📦 Installing Node dependencies..."
    npm install > /dev/null 2>&1 &
    npm_pid=$!
fi

# Check Python requirements
if [ -f "requirements.txt" ]; then
    echo "📦 Checking Python requirements..."
    python -m pip install -q -r requirements.txt > /dev/null 2>&1 &
    pip_pid=$!
fi

# Wait for npm if it's running
if [ -n "$npm_pid" ]; then
    wait $npm_pid 2>/dev/null
fi

# Wait for pip if it's running
if [ -n "$pip_pid" ]; then
    wait $pip_pid 2>/dev/null
fi

echo ""
echo -e "${BLUE}Step 3: Checking for port conflicts${NC}"
echo ""

# Ports: ML=8001, Express=8000, Vite=5173
for port in 8001 8000 5173; do
    if check_port $port; then
        echo -e "${YELLOW}⚠️  Port $port is already in use${NC}"
        read -p "Kill process on port $port? (y/n) " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            killport $port
            echo -e "${GREEN}✓${NC} Killed process on port $port"
        fi
    fi
done

echo ""
echo -e "${BLUE}Step 4: Starting services${NC}"
echo ""
echo -e "${YELLOW}Make sure to open these files in separate terminals:${NC}"
echo ""
echo -e "${BLUE}Terminal 1 - FastAPI ML Service (Port 8001)${NC}"
echo "cd $PROJECT_DIR && python api.py"
echo ""
echo -e "${BLUE}Terminal 2 - Express Backend (Port 8000)${NC}"
echo "cd $PROJECT_DIR && node server.js"
echo ""
echo -e "${BLUE}Terminal 3 - React Frontend (Port 5173)${NC}"
echo "cd $PROJECT_DIR && npm run dev"
echo ""
echo -e "${GREEN}Use the commands above to start each service in a separate terminal.${NC}"
echo ""

# Option to start them automatically on macOS
if [[ "$OSTYPE" == "darwin"* ]]; then
    echo -e "${YELLOW}macOS detected - Would you like to start services in new Terminal windows? (y/n)${NC}"
    read -p "" -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "Starting ML API in new Terminal window..."
        osascript -e "tell app \"Terminal\" to do script \"cd '$PROJECT_DIR' && python api.py\""
        sleep 2
        
        echo "Starting Express backend in new Terminal window..."
        osascript -e "tell app \"Terminal\" to do script \"cd '$PROJECT_DIR' && node server.js\""
        sleep 2
        
        echo "Starting React frontend in new Terminal window..."
        osascript -e "tell app \"Terminal\" to do script \"cd '$PROJECT_DIR' && npm run dev\""
        
        echo ""
        echo -e "${GREEN}✅ All services starting in separate Terminal windows!${NC}"
        echo ""
        echo "Waiting for services to start..."
        sleep 5
        
        echo ""
        echo -e "${GREEN}═══════════════════════════════════════${NC}"
        echo -e "${GREEN}🎉 PayNest is ready!${NC}"
        echo -e "${GREEN}═══════════════════════════════════════${NC}"
        echo ""
        echo -e "${BLUE}Frontend:${NC} http://localhost:5173"
        echo -e "${BLUE}Backend:${NC}  http://localhost:8000"
        echo -e "${BLUE}ML API:${NC}   http://localhost:8001"
        echo ""
        echo "Check the ML_INTEGRATION_GUIDE.md for testing instructions"
        echo ""
        sleep 10
    fi
fi

echo ""
echo -e "${GREEN}Setup complete!${NC}"
echo ""
echo "If you started services manually, check that:"
echo "  1. ML API is running and models loaded (check logs)"
echo "  2. Express backend is connected to ML API"
echo "  3. Frontend can access backend at http://localhost:8000"
echo ""
echo "Visit http://localhost:5173 to access the app"
echo ""
