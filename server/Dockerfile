# Use a standard Node.js image (Debian-based) for better compatibility
# with native addons like sqlite3. This helps avoid architecture mismatches.
FROM node:20 AS build
WORKDIR /app

ENV DATABASE_URL="file:./dev.sqlite3"
ENV JWT_SECRET="your-super-secret-key-that-is-long-and-secure"


# Copy all necessary package definitions and the lockfile first
COPY package.json yarn.lock ./
COPY server/package.json ./server/
COPY client/package.json ./client/

# Install ALL dependencies, including devDependencies needed for migration
RUN yarn install --frozen-lockfile

# Now, copy the rest of the source code into the correct structure
COPY . .

# Build the TypeScript source code for the server workspace
RUN yarn --cwd server build && yarn --cwd server db:push && yarn --cwd server db:seed

# --- This single stage image will be used directly ---
# It's larger than a multi-stage build, but more reliable for native modules.

EXPOSE 3001
# The command now points to the built code inside the server directory
CMD ["node", "server/dist/src/server.js"]
