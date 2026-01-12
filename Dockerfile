# ---------- Build frontend ----------
FROM node:20-alpine AS frontend-build
WORKDIR /frontend
COPY frontend/biz-track/package*.json ./
RUN npm install
COPY frontend/biz-track .
RUN npm run build

# ---------- Build backend ----------
FROM node:20-alpine AS backend-build
WORKDIR /backend
COPY backend/package*.json ./
RUN npm install
COPY backend .

# ---------- Final image ----------
FROM nginx:alpine

# Copy frontend build
COPY --from=frontend-build /frontend/dist /usr/share/nginx/html

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy backend
COPY --from=backend-build /backend /backend

# Install node for backend runtime
RUN apk add --no-cache nodejs npm

WORKDIR /backend

EXPOSE 80

CMD sh -c "node server.js & nginx -g 'daemon off;'"
