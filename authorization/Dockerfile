FROM node:alpine AS build_stage
WORKDIR /app
COPY ./authorization/package*.json ./
RUN npm install
COPY ./authorization/ ./
EXPOSE 6000
CMD ["node", "server.js"]