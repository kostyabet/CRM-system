FROM node:alpine AS build_stage
WORKDIR /app
COPY ./frontend/package*.json ./
RUN npm install --legacy-peer-deps
COPY ./frontend/ ./
RUN npm run build

FROM nginx
COPY --from=build_stage /app/build /usr/share/nginx/html
COPY ./frontend/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3000