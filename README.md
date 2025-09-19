# Personal Portfolio Website

A modern, interactive portfolio website built with a microservices architecture, showcasing projects, resume data, contact forms, and analytics. The site is containerized with Docker, deployed via Google Cloud Run, and powered by GitHub Actions for CI/CD.

---

## Tech Stack
### Deployment & DevOps
- Google Cloud Run - Serverless deployment for each microservice
- Docker - Containerization of all services
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

Clone the repository and use Docker Compose to run services locally:
```bash
git clone https://github.com/leilanihc112/Portfolio.git
cd Portfolio
docker-compose up --build
```
---

## Deployment

Each service is deployed independently to Google Cloud Run via GitHub Actions. CI/CD workflows are located in .github/workflows/.

---
