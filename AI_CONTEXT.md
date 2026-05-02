# AI Context — Dev Environment Standard (Jesse Stack)

---

## Core Principle
All development occurs inside a standardized, reusable system.

- Every app must follow the same structure
- Every service must be externally accessible
- No one-off builds, no ad-hoc setups
- Claude must ALWAYS build within this system

---

## Environment
- Running on remote Linux VM
- Accessed from external machine (NOT localhost browser)
- All services must be externally accessible via Cloudflare

---

## Networking / Tunneling

- Use Cloudflare **named tunnels ONLY**
- NEVER use quick tunnels for real workflows

### Domain Pattern
- Frontend:  
  `appname.jesseboudreau.com`
- Backend API:  
  `appname-api.jesseboudreau.com`

### Cloudflare Config Location
~/.cloudflared/config.yml

### Service Mapping Standard
- Frontend → localhost:3000
- Backend → localhost:8100

---

## Process Management

Every app MUST include:


./start.sh
./stop.sh


### start.sh Responsibilities
- Kill stale processes
- Start backend (FastAPI via venv)
- Start frontend (Next.js production mode)
- Start Cloudflare named tunnel
- Write logs to `.logs/`
- Run all processes in background
- Use `disown` so processes persist after SSH exit

### stop.sh Responsibilities
- Kill all app-related processes
- Kill cloudflared processes
- Free ports (3000, 8100)
- Reset environment if needed

---

## Ports (Strict Standard)

- Backend: 8100
- Frontend: 3000

Rules:
- Do NOT change ports per project
- Always free ports before startup
- Avoid collisions with other services

---

## Database Standard (REQUIRED)

- PostgreSQL (local VM instance)
- Each app gets its own database
- No shared tables across apps

### Connection Pattern

DATABASE_URL=postgresql+psycopg2://user:password@localhost:5432/db_name


### Backend Rules
- SQLAlchemy ORM required
- Use JSONB for structured fields
- Auto-create tables in dev mode
- Fail loudly if DB is unavailable
- NEVER use SQLite (except temporary testing)

---

## Automation Layer (n8n)

- n8n runs locally on:
  localhost:5678

### Usage
- Workflow automation
- Data ingestion
- Scraping pipelines
- External integrations

### Future Integration Targets
- Inventory ingestion pipelines
- Marketplace sync
- Estate sale / thrift feed ingestion
- Data enrichment workflows

---

## Frontend Standard

- Framework: Next.js (App Router)
- MUST run in production mode:


npm run build
npm start


### Environment Rule

NEXT_PUBLIC_API_URL must ALWAYS point to Cloudflare domain


❌ NEVER use localhost in frontend API calls

---

## Backend Standard

- Framework: FastAPI
- Server: Uvicorn (via virtual environment)

### Required Structure

app/
domains/<feature>/


### Required Endpoints
- `/health` → must always return `{ "status": "ok" }`

### Architecture Rules
- Domain-based routing
- No monolithic route files
- Clear separation of concerns

---

## Logging Standard

All logs stored in:

.logs/


Required:
- api.log
- web.log
- tunnel.log

---

## Error Handling Standard

### Frontend
- Must display REAL error messages
- No generic "Failed to load"
- Must handle empty data safely

### Backend
- Endpoints must NEVER crash
- Always return safe defaults when possible
- Log all failures

---

## Development Philosophy

### Roles

Claude:
- Performs ALL multi-file changes
- Builds features
- Refactors systems
- Maintains structure

Jesse:
- Defines architecture
- Orchestrates workflow
- Validates system behavior

ChatGPT:
- Debugs edge cases
- Explains root causes
- Guides system design decisions

---

## ❗ Template Standard (CRITICAL)

ALL projects MUST be built from:


JBFastMVP


---

## JBFastMVP Requirements

### Structure

apps/
api/
web/


### Included in EVERY project
- start.sh
- stop.sh
- Cloudflare tunnel integration
- PostgreSQL connection
- Logging system
- Environment configuration

---

## ❌ NEVER DO THIS

- Create new project structure from scratch
- Use SQLite
- Use random ports
- Use trycloudflare URLs
- Hardcode localhost in frontend
- Manually wire services differently per project

---

## ✅ ALWAYS DO THIS

- Copy JBFastMVP template
- Rename app + database
- Update environment variables
- Run:


./start.sh


---

## System Goal

Every app must:


Start with ONE command
Run reliably
Be externally accessible
Use the same architecture


---

## Outcome

This is not a dev setup.

This is a:

👉 Reusable AI-native application platform  
👉 Standardized multi-app environment  
👉 Production-aligned local system  

All future builds must conform to this system.
