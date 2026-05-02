#!/bin/bash

set -e

APP_NAME="appname"   # TODO: rename to match your Cloudflare tunnel name
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
LOG_DIR="$SCRIPT_DIR/.logs"

# ── Free ports ────────────────────────────────────────────────────────────────
fuser -k 8100/tcp 2>/dev/null || true
fuser -k 3000/tcp 2>/dev/null || true
pkill -f "cloudflared tunnel run $APP_NAME" 2>/dev/null || true

# ── Backend ───────────────────────────────────────────────────────────────────
nohup "$SCRIPT_DIR/apps/api/venv/bin/uvicorn" app.main:app \
  --host 0.0.0.0 --port 8100 \
  --app-dir "$SCRIPT_DIR/apps/api" \
  > "$LOG_DIR/api.log" 2>&1 &
disown $!

# ── Frontend ──────────────────────────────────────────────────────────────────
cd "$SCRIPT_DIR/apps/web"
npm run build >> "$LOG_DIR/web.log" 2>&1
nohup npm start >> "$LOG_DIR/web.log" 2>&1 &
disown $!

# ── Tunnel ────────────────────────────────────────────────────────────────────
nohup cloudflared tunnel run "$APP_NAME" > "$LOG_DIR/tunnel.log" 2>&1 &
disown $!

# ── Done ─────────────────────────────────────────────────────────────────────
echo "Frontend : https://$APP_NAME.yourdomain.com"
echo "API      : https://$APP_NAME-api.yourdomain.com/docs"
