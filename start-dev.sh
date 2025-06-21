
#!/bin/bash

echo "🧹 Cleaning up any zombie processes..."
killall -9 node || true
fuser -k 9002/tcp || true
lsof -ti:9002 | xargs kill -9 || true
sleep 5

echo "🚀 Starting Next.js dev server on port 9002..."
PORT=9002 next dev --port 9002 --hostname 0.0.0.0
