# Stage 1: Build
FROM node:alpine AS build_stage
WORKDIR /app
COPY ./frontend/package*.json ./
RUN npm install
COPY ./frontend/ ./
RUN npm run build

# Stage 2: Server
FROM nginx
COPY --from=build_stage /app/build /usr/share/nginx/html
EXPOSE 80