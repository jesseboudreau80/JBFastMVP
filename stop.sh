#!/bin/bash

APP_NAME="appname"   # TODO: must match APP_NAME in start.sh

echo "[stop.sh] Stopping $APP_NAME..."

# ── Cloudflared ───────────────────────────────────────────────────────────────
if pkill -f "cloudflared tunnel run $APP_NAME" 2>/dev/null; then
  echo "[stop.sh] Cloudflared tunnel stopped"
else
  echo "[stop.sh] Cloudflared was not running"
fi

# ── Backend (uvicorn) ─────────────────────────────────────────────────────────
if pkill -f "uvicorn app.main:app" 2>/dev/null; then
  echo "[stop.sh] Backend stopped"
else
  echo "[stop.sh] Backend was not running"
fi

# ── Frontend (Next.js) ────────────────────────────────────────────────────────
if pkill -f "next start" 2>/dev/null; then
  echo "[stop.sh] Frontend stopped"
else
  echo "[stop.sh] Frontend was not running"
fi

# ── Free ports ────────────────────────────────────────────────────────────────
fuser -k 8100/tcp 2>/dev/null && echo "[stop.sh] Port 8100 freed" || true
fuser -k 3000/tcp 2>/dev/null && echo "[stop.sh] Port 3000 freed" || true

echo "[stop.sh] Done."
