#!/usr/bin/env bash
set -e

# Start ML API in the background, then run the Express backend in the foreground.
# The Node backend listens on PORT and must be the main process for Render.
python3 api.py &
PY_PID=$!

trap "kill $PY_PID" EXIT

exec node server.js
