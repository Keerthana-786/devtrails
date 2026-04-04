# Use a multi-stage build to keep the image slim
# Stage 1: Build the React frontend
FROM node:20-slim AS frontend-builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --include=dev
COPY . .
RUN npm run build

# Stage 2: Final image with Node.js and Python
FROM node:20-slim
WORKDIR /app

# Install Python and supporting packages
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 python3-venv python3-pip python3-dev build-essential \
    curl ca-certificates && \
    rm -rf /var/lib/apt/lists/*

RUN python3 -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

# Upgrade pip and wheel before installing ML dependencies
RUN pip install --no-cache-dir --upgrade pip setuptools wheel

# Copy and install Python dependencies first (for better caching)
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy Node.js dependencies and install
COPY package*.json ./
RUN npm ci --include=dev

# Copy built frontend from Stage 1
COPY --from=frontend-builder /app/dist ./dist

# Copy backend source files
COPY server.js chatbot.js api.py ./
COPY models/ ./models/
COPY datasets/ ./datasets/

# Create non-root user for security
RUN groupadd -g 1001 nodejs && \
    useradd -u 1001 -g nodejs -m nodejs

# Change ownership of app directory
RUN chown -R nodejs:nodejs /app
USER nodejs

# Expose port
EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8000/health || exit 1

# Set environment variables
ENV NODE_ENV=production
ENV PORT=8000
ENV ML_URL=http://localhost:8001

# Start the application
CMD ["npm", "run", "start"]
