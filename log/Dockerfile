FROM node:alpine AS build_stage
WORKDIR /app
COPY ./tasks/package*.json ./
RUN npm install --legacy-peer-deps
COPY ./tasks/ ./
EXPOSE 5002
CMD ["node", "server.js"]