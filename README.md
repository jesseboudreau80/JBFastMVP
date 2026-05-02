# JBFastMVP

## 🚀 Purpose

JBFastMVP is a high-speed starter template for building production-aligned full-stack applications. Every new app starts here — clone, rename, configure, and run. One command gets you a live, externally accessible app.

---

## 🧠 My Role

Built as a reusable system for rapid development using AI-assisted workflows. This template enforces a consistent architecture across every project so that infrastructure never needs to be rebuilt from scratch.

---

## 🧰 Technologies

| Layer     | Stack                              |
|-----------|------------------------------------|
| Backend   | FastAPI + SQLAlchemy + PostgreSQL  |
| Frontend  | Next.js 15 (App Router)            |
| Server    | Uvicorn (via Python venv)          |
| Tunnel    | Cloudflare Named Tunnels           |
| Platform  | Linux VM (remote, SSH-accessed)    |

---

## ⚙️ Setup

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/JBFastMVP.git myapp
cd myapp
```

### 2. Create the database

```bash
createdb myapp
```

### 3. Configure backend environment

```bash
cp .env.example .env
# Edit .env and set DATABASE_URL and any other vars
```

### 4. Configure frontend environment

```bash
nano apps/web/.env.local
```

Add:

```
NEXT_PUBLIC_API_URL=https://myapp-api.yourdomain.com
```

### 5. Install dependencies (first run only)

```bash
# Backend
cd apps/api
python3 -m venv venv
venv/bin/pip install -r requirements.txt

# Frontend
cd ../web
npm install
```

### 6. Set your app name in start.sh and stop.sh

```bash
# In start.sh and stop.sh, set:
APP_NAME="myapp"
```

### 7. Launch

```bash
./start.sh
```

---

## 🌐 Access

| Service  | URL                                      |
|----------|------------------------------------------|
| Frontend | `https://appname.yourdomain.com`         |
| API Docs | `https://appname-api.yourdomain.com/docs`|
| Health   | `https://appname-api.yourdomain.com/health` |

---

## 🧱 Structure

```
JBFastMVP/
├── apps/
│   ├── api/                        # FastAPI backend
│   │   ├── app/
│   │   │   ├── main.py             # App entrypoint, startup, CORS
│   │   │   ├── database.py         # SQLAlchemy engine + session
│   │   │   └── domains/
│   │   │       └── health/
│   │   │           └── router.py   # GET /health
│   │   └── requirements.txt
│   └── web/                        # Next.js frontend
│       ├── app/
│       │   ├── layout.tsx
│       │   ├── page.tsx            # Home — displays API health
│       │   └── dashboard/
│       │       └── page.tsx        # Dashboard view
│       ├── lib/
│       │   └── api.ts              # Typed fetch client
│       ├── next.config.js
│       └── package.json
├── .logs/                          # Runtime logs (gitignored)
├── .env.example                    # Environment variable template
├── start.sh                        # Start all services
└── stop.sh                         # Stop all services
```

---

## 🔄 Workflow

```
./start.sh
    │
    ├─▶ Kill stale processes on ports 8100 + 3000
    ├─▶ Start FastAPI backend (uvicorn, port 8100)
    ├─▶ Build + start Next.js frontend (port 3000)
    └─▶ Start Cloudflare named tunnel
             │
             └─▶ Live app accessible at your domain
```

All processes run in the background and persist after SSH exit via `disown`.

Logs are written to:

```
.logs/api.log       ← backend
.logs/web.log       ← frontend
.logs/tunnel.log    ← cloudflare tunnel
```

---

## 📈 Future Use

This template is the foundation for:

- **ResellerOS** — resale inventory and marketplace management
- **Aegis** — monitoring and alerting platform
- **PAWSitiveOps** — pet care operations system

Every app built on JBFastMVP inherits the same infrastructure, deployment pattern, and conventions.

---

## 🧠 Lessons Learned

- **Stable infrastructure beats clever automation** — dynamic install scripts cause unpredictable failures; dependencies are installed once, intentionally
- **Standardization compounds** — every app using the same ports, structure, and tunnel pattern means zero re-learning between projects
- **Separation of setup and runtime** — `start.sh` starts services; it never installs, configures, or mutates files

---

## 🚀 Future Plans

- Add JWT authentication module
- Add AI assistant integration via Claude API
- Add n8n automation hooks for data ingestion pipelines
- Add base domain model and CRUD scaffolding

---

## Cloudflare Tunnel Setup

Ensure `~/.cloudflared/config.yml` maps both services:

```yaml
tunnel: appname
credentials-file: /home/<user>/.cloudflared/<tunnel-id>.json

ingress:
  - hostname: appname.yourdomain.com
    service: http://localhost:3000
  - hostname: appname-api.yourdomain.com
    service: http://localhost:8100
  - service: http_status:404
```
