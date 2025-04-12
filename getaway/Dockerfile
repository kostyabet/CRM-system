FROM node:alpine AS build_stage
WORKDIR /app
COPY ./getaway/package*.json ./
RUN npm install
COPY ./getaway/ ./
EXPOSE 5000
CMD ["node", "index.js"]