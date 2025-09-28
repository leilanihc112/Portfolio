# Stage 1: Build the app
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve the app using Vite's preview server
FROM node:22-alpine AS runtime
WORKDIR /app
COPY --from=build /app .
COPY --from=build /app/node_modules ./node_modules
EXPOSE 3000
CMD ["npx", "vite", "preview", "--port", "3000", "--host"]

