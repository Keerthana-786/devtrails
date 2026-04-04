# Use a multi-stage build to keep the image slim
# Stage 1: Build the React frontend
FROM node:20-alpine AS frontend-builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Final image with Node.js and Python
FROM node:20-alpine
WORKDIR /app

# Install Python and dependencies
RUN apk add --no-cache python3 py3-pip
RUN python3 -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

# Copy and install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy Node.js dependencies
COPY package*.json ./
RUN npm install --production

# Copy built frontend from Stage 1
COPY --from=frontend-builder /app/dist ./dist

# Copy backend files
COPY server.js chatbot.js api.py ./
COPY models/ ./models/

# Expose ports
EXPOSE 8000
EXPOSE 8001

# Set environment variables
ENV NODE_ENV=production
ENV PORT=8000
ENV ML_URL=http://localhost:8001

# Start both services
CMD ["npm", "run", "start"]
