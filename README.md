# Personal Portfolio Website

A modern, interactive portfolio website built with a microservices architecture, showcasing projects, resume data, contact forms, and analytics. The site is containerized with Docker, deployed via Google Cloud Run, and powered by GitHub Actions for CI/CD.

---

## Tech Stack
### Deployment & DevOps
- Google Cloud Run - Serverless deployment for each microservice
- Docker - Containerization of all services
- Kubernetes - Manifests for running the full stack on a cluster (local kind/minikube, GKE-ready)
- Helm - Packages the Kubernetes manifests as one chart with per-environment values
- GitHub Actions - CI/CD pipeline for automated builds and deployments

### Frontend
- React - Single-page application with dynamic routing and interactivity

### Backend Microservices

| Service | Language | Framework | Description |
|--------|--------|--------|--------|
| Project Showcase | Node.js / Python | Express / FastAPI | Displays interactive projects |
| Resume Data | C# ASP.NET Core (.NET 8) | Web API | Serves bio, skills, experience |
| Contact Form | Node.js / Python | Express / Flask | Handles form submissions |
| Social Links | Node.js / JSON | Express | Serves social media links |
| Analytics | Python / Node.js | FastAPI / Express | Tracks project views and interactions |
| Auth Service | Node.js / C# ASP.NET | Express / Web API | Manages user authentication |

---

## Interactive Projects

Projects include hardware and software integrations such as:
- Portable Gave Table with touch sensors
  - Games: Snake, Tetris, Connect Four
  - Embedded demos and videos planned for future updates
---

## Project Sorting Features

Projects can be sorted by:
- Date - Most recent first
- Importance - Manually assigned priority
- Popularity - Based on interactions (views, interactions)

---

## Local Development

Before starting, create these gitignored files in the repo root:
- `.env` - environment variables shared by the backend services
- `mongo_root_username.txt` / `mongo_root_password.txt` - MongoDB root credentials (Docker secrets)

On SELinux systems (Fedora/RHEL), containers can't read files in your home directory by default, so Mongo fails with `Permission denied` on its secrets. Relabel them once (and again if you recreate them):
```bash
chcon -t container_file_t mongo_root_username.txt mongo_root_password.txt
```

Clone the repository and use Docker Compose to run services locally:
```bash
git clone https://github.com/leilanihc112/Portfolio.git
cd Portfolio
docker-compose up --build
```
---

## Kubernetes (planned)

The stack can also run on a Kubernetes cluster, packaged as a single Helm chart. The microservices share one template, so the chart loops over a `services:` list in `values.yaml` instead of repeating near-identical YAML per service:

```
helm/portfolio/
  Chart.yaml
  values.yaml          # defaults + list of services
  values-local.yaml    # kind/minikube overrides (local images, small storage)
  values-gke.yaml      # GKE overrides (registry images, managed ingress)
  templates/           # Deployment/Service (looped), Ingress, ConfigMap, Secret, Mongo StatefulSet
```

Install it locally with:
```bash
helm install portfolio ./helm/portfolio -f helm/portfolio/values-local.yaml
```

Real secret values (e.g. Mongo credentials) go in `helm/portfolio/values-secrets.yaml`, which is gitignored, and get passed in at install time:
```bash
helm install portfolio ./helm/portfolio -f helm/portfolio/values-local.yaml -f helm/portfolio/values-secrets.yaml
```

How the pieces map:
- **Deployment + Service per microservice** - Deployments keep the pods running; Services give each one a stable in-cluster DNS name (e.g. `http://resume-data:8080`), same as the Compose service names
- **Ingress** - single entry point: `/` routes to the frontend, `/api/<service>` routes to each backend (the React app calls the APIs from the browser, so they need public paths). Needs an ingress controller (ingress-nginx locally, GKE's load balancer in the cloud)
- **ConfigMaps / Secrets** - replace `.env` and the Mongo secret files. Secrets are only base64-encoded, so their values stay out of git
- **MongoDB StatefulSet + PersistentVolumeClaim** - written in the chart rather than pulled from a third-party chart. The PVC requests storage and the cluster's StorageClass provides it: a directory on the node locally, a Persistent Disk on GKE. On kind, data is lost when the cluster is deleted unless `extraMounts` maps it to a host folder

Local clusters can't see images built on your machine, so load them first (e.g. `kind load docker-image <image>`).

---

## Deployment

Each service is deployed independently to Google Cloud Run via GitHub Actions, which scales to zero when idle and keeps hosting costs near nothing. Kubernetes (above) is an alternative target and a possible future move to GKE.

CI/CD workflows will live in `.github/workflows/` (not created yet).

---
