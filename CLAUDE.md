# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Personal portfolio site built as a polyglot microservices system: a React (Vite) frontend plus independent backend services, each in its own container, sharing one MongoDB instance. Deployment is planned for Google Cloud Run with GitHub Actions CI/CD, one deploy per service. The README refers to `.github/workflows/`, but that directory doesn't exist yet.

The project is at the scaffolding stage. Every backend service only exposes a `GET /health` endpoint. The frontend is a placeholder `App.jsx`. Nothing connects to MongoDB yet.

## Running locally

The whole stack runs through Docker Compose from the repo root:

```bash
docker-compose up --build
docker-compose up --build <service>   # e.g. analytics, frontend, resume-data
```

Compose needs these gitignored files in the repo root before it will start:
- `.env`: loaded by every backend service through `env_file`
- `mongo_root_username.txt` and `mongo_root_password.txt`: Docker secrets for the Mongo root user

| Compose service | Source dir | Host port → container port |
|---|---|---|
| frontend | `frontend/` | 3000 → 3000 (`vite preview`) |
| project-showcase | `services/project-showcase-node/` | 4000 → 3000 |
| contact-form | `services/contact-form-node/` | 4001 → 3000 |
| social-links | `services/social-links/` | 4002 → 3000 |
| auth-service | `services/auth-service-node/` | 4003 → 3000 |
| analytics | `services/analytics-python/` | 8000 → 8000 |
| resume-data | `services/resume-data-dotnet/ResumeDataService/` | 5000 → 8080 |
| mongodb | `mongo:9.0` | 27017 → 27017 |

## Per-service development

- **Frontend** (`frontend/`, React 19 + Vite 7): `npm install`, `npm run dev`, `npm run build`, `npm run lint` (ESLint flat config in `eslint.config.js`).
- **Node services** (Express 5, CommonJS, one `index.js` each): `npm install && node index.js`. They read `PORT` from the environment and fall back to 3000. The four Node services start from the same template, so a structural change to one usually applies to all of them.
- **Analytics** (FastAPI): `pip install -r requirements.txt && uvicorn main:app --reload --port 8000`.
- **Resume data** (ASP.NET Core minimal API, .NET 8): `dotnet run` in `ResumeDataService/`. Swagger UI is enabled in Development.

No service has tests or test tooling yet. The Node `npm test` scripts are the default stubs that exit with an error.

## Repo hygiene

Dependency folders and build output (`node_modules/`, `venv/`, `bin/`, `obj/`) are gitignored, and each service has a `.dockerignore`, so images always install dependencies fresh. Keep it that way: never commit these.
