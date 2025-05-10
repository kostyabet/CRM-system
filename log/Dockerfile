FROM node:alpine AS build_stage
WORKDIR /app
COPY ./log/package*.json ./
RUN npm install --legacy-peer-deps
COPY ./log/ ./
EXPOSE 5002
CMD ["node", "server.js"]