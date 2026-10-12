FROM node:22-alpine
WORKDIR /app
# Copy the manifests first so the npm ci layer stays cached until deps change
COPY package*.json ./
# npm ci installs exactly what's in the lockfile; prod deps only for the runtime image
RUN npm ci --omit=dev
COPY . .
EXPOSE 3000
CMD ["node", "index.js"]
