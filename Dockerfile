FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

# Install openssl
RUN [ "apt-get", "update", "-y" ]
RUN [ "apt-get", "install", "-y", "openssl" ]

# Enable corepack (pnpm)
RUN [ "corepack", "enable" ]

WORKDIR /app
COPY . .

FROM base AS prod-deps
# Install production dependencies
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

FROM base AS build
# Install build dependencies
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

# Generate prisma client
RUN [ "npx", "prisma", "generate" ]

# Build the app
RUN [ "pnpm", "run", "build" ]

FROM base
# Copy production dependencies and build
COPY --from=prod-deps /app/node_modules /app/node_modules 
COPY --from=build /app/dist /app/dist

# Start the app
ENTRYPOINT [ "pnpm", "start" ]