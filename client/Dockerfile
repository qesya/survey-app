# Stage 1: Install all dependencies
FROM node:20-alpine AS deps
WORKDIR /app

ENV VITE_API_BASE_URL="http://localhost:3001/api"

COPY package.json yarn.lock ./
COPY server/package.json ./server/
COPY client/package.json ./client/
RUN yarn install --frozen-lockfile

# Stage 2: Build the client application
FROM node:20-alpine AS builder
WORKDIR /app
# Copy dependencies from the previous stage
COPY --from=deps /app/node_modules ./node_modules
# Copy all source code
COPY . .
# Execute the build command specifically for the 'client' workspace
RUN yarn --cwd client build

# Stage 3: Serve with Nginx
FROM nginx:stable-alpine
# Copy the built assets from the previous stage
COPY --from=builder /app/client/dist /usr/share/nginx/html
# Copy the Nginx configuration file from the client folder in the context
COPY client/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
