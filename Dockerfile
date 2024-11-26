# Build stage
FROM node:18-alpine AS build-stage
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine AS production-stage
# Copy custom nginx configuration (optional but recommended)
COPY nginx.conf /etc/nginx/nginx.conf

# Copy built files from build stage to nginx html directory
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Default nginx command
CMD ["nginx", "-g", "daemon off;"]